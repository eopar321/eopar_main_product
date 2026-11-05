import { CfnOutput, Duration, RemovalPolicy, Stack, Tags, type StackProps } from 'aws-cdk-lib'
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch'
import * as cwActions from 'aws-cdk-lib/aws-cloudwatch-actions'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as rds from 'aws-cdk-lib/aws-rds'
import type { Construct } from 'constructs'

export interface EoparStackProps extends StackProps {
  stage: 'staging' | 'production'
  instanceSize: 'small' | 'medium'
}

/**
 * One EC2 host (Docker Compose: web, worker, redis, clamav, waf, cloudflared) + one RDS PostgreSQL.
 * Cloudflare Tunnel is the only way in, so the host has no inbound rules at all (brief §12A).
 */
export class EoparStack extends Stack {
  constructor(scope: Construct, id: string, props: EoparStackProps) {
    super(scope, id, props)
    const isProd = props.stage === 'production'
    Tags.of(this).add('project', 'eopar')
    Tags.of(this).add('stage', props.stage)

    // Public subnets give the host outbound internet without a paid NAT gateway; with zero inbound
    // security-group rules nothing can reach it. RDS sits in isolated subnets with no internet route.
    const vpc = new ec2.Vpc(this, 'Vpc', {
      maxAzs: 2,
      natGateways: 0,
      // Would add a Lambda custom resource; brief allows EC2 + RDS only. The default SG is never attached.
      restrictDefaultSecurityGroup: false,
      subnetConfiguration: [
        { name: 'host', subnetType: ec2.SubnetType.PUBLIC, cidrMask: 24 },
        { name: 'db', subnetType: ec2.SubnetType.PRIVATE_ISOLATED, cidrMask: 24 },
      ],
    })

    const hostSg = new ec2.SecurityGroup(this, 'HostSg', {
      vpc,
      description: 'EOPAR host: no inbound rules (Cloudflare Tunnel is outbound-only)',
      allowAllOutbound: true,
    })

    const dbSg = new ec2.SecurityGroup(this, 'DbSg', {
      vpc,
      description: 'EOPAR RDS: Postgres from the host only',
      allowAllOutbound: false,
    })
    dbSg.addIngressRule(hostSg, ec2.Port.tcp(5432), 'Postgres from EOPAR host')

    // TLS required for every connection
    const parameterGroup = new rds.ParameterGroup(this, 'DbParams', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_18 }),
      parameters: { 'rds.force_ssl': '1' },
    })

    const db = new rds.DatabaseInstance(this, 'Db', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_18 }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T4G,
        isProd ? ec2.InstanceSize.SMALL : ec2.InstanceSize.MICRO,
      ),
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      securityGroups: [dbSg],
      parameterGroup,
      databaseName: 'eopar',
      // RDS-managed master password (DECISIONS D-008)
      credentials: rds.Credentials.fromGeneratedSecret('eopar_admin'),
      publiclyAccessible: false,
      storageEncrypted: true,
      storageType: rds.StorageType.GP3,
      allocatedStorage: 20,
      maxAllocatedStorage: 100,
      backupRetention: Duration.days(isProd ? 14 : 7),
      deletionProtection: isProd,
      removalPolicy: isProd ? RemovalPolicy.SNAPSHOT : RemovalPolicy.DESTROY,
      autoMinorVersionUpgrade: true,
      multiAz: false,
    })

    // Session Manager instead of SSH; nothing else
    const role = new iam.Role(this, 'HostRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore')],
    })

    const host = new ec2.Instance(this, 'Host', {
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      securityGroup: hostSg,
      role,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T4G,
        props.instanceSize === 'medium' ? ec2.InstanceSize.MEDIUM : ec2.InstanceSize.SMALL,
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux2023({
        cpuType: ec2.AmazonLinuxCpuType.ARM_64,
      }),
      requireImdsv2: true,
      associatePublicIpAddress: true,
      blockDevices: [
        {
          deviceName: '/dev/xvda',
          volume: ec2.BlockDeviceVolume.ebs(30, {
            encrypted: true,
            volumeType: ec2.EbsDeviceVolumeType.GP3,
          }),
        },
        {
          // /srv/eopar — uploads (private) and media (public)
          deviceName: '/dev/sdf',
          volume: ec2.BlockDeviceVolume.ebs(50, {
            encrypted: true,
            volumeType: ec2.EbsDeviceVolumeType.GP3,
          }),
        },
      ],
    })
    // Phase 8: cloud-init installs Docker + cloudflared, mounts the data volume, pulls images.

    // Auto-recover the instance if the underlying hardware fails (single-server mitigation, brief §12A)
    new cloudwatch.Alarm(this, 'HostAutoRecover', {
      metric: new cloudwatch.Metric({
        namespace: 'AWS/EC2',
        metricName: 'StatusCheckFailed_System',
        dimensionsMap: { InstanceId: host.instanceId },
        period: Duration.minutes(1),
        statistic: 'Maximum',
      }),
      threshold: 1,
      evaluationPeriods: 2,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
    }).addAlarmAction(new cwActions.Ec2Action(cwActions.Ec2InstanceAction.RECOVER))

    // Burstable-credit alarms. Email notification actions are wired in Phase 8.
    new cloudwatch.Alarm(this, 'HostLowCpuCredits', {
      metric: new cloudwatch.Metric({
        namespace: 'AWS/EC2',
        metricName: 'CPUCreditBalance',
        dimensionsMap: { InstanceId: host.instanceId },
        period: Duration.minutes(5),
      }),
      threshold: 20,
      evaluationPeriods: 3,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
    })
    new cloudwatch.Alarm(this, 'DbLowCpuCredits', {
      metric: db.metric('CPUCreditBalance', { period: Duration.minutes(5) }),
      threshold: 20,
      evaluationPeriods: 3,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
    })
    new cloudwatch.Alarm(this, 'DbLowStorage', {
      metric: db.metricFreeStorageSpace({ period: Duration.minutes(5) }),
      threshold: 2 * 1024 ** 3,
      evaluationPeriods: 2,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
    })

    new CfnOutput(this, 'HostInstanceId', { value: host.instanceId })
    new CfnOutput(this, 'DbEndpoint', { value: db.dbInstanceEndpointAddress })
  }
}
