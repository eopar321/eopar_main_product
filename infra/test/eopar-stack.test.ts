import { App } from 'aws-cdk-lib'
import { Match, Template } from 'aws-cdk-lib/assertions'
import { describe, expect, it } from 'vitest'

import { EoparStack } from '../lib/eopar-stack.js'

// Launch-checklist guarantees (brief §13) enforced as tests.
const template = Template.fromStack(
  new EoparStack(new App(), 'Test', {
    env: { region: 'ap-south-1' },
    stage: 'production',
    instanceSize: 'medium',
  }),
)

describe('EoparStack', () => {
  it('gives the host security group zero inbound rules', () => {
    const groups = template.findResources('AWS::EC2::SecurityGroup', {
      Properties: { GroupDescription: Match.stringLikeRegexp('EOPAR host') },
    })
    const [hostSg] = Object.values(groups)
    expect(hostSg).toBeDefined()
    expect(hostSg?.Properties.SecurityGroupIngress).toBeUndefined()
    // …and no stand-alone ingress rule targets it either
    const ingress = template.findResources('AWS::EC2::SecurityGroupIngress')
    for (const rule of Object.values(ingress)) {
      expect(rule.Properties.Description).toBe('Postgres from EOPAR host')
      expect(rule.Properties.FromPort).toBe(5432)
    }
  })

  it('requires IMDSv2 and encrypts every host volume', () => {
    template.hasResourceProperties('AWS::EC2::LaunchTemplate', {
      LaunchTemplateData: { MetadataOptions: { HttpTokens: 'required' } },
    })
    template.hasResourceProperties('AWS::EC2::Instance', {
      BlockDeviceMappings: Match.arrayWith([
        Match.objectLike({ Ebs: Match.objectLike({ Encrypted: true }) }),
      ]),
    })
    const [instance] = Object.values(template.findResources('AWS::EC2::Instance'))
    for (const mapping of instance?.Properties.BlockDeviceMappings ?? []) {
      expect(mapping.Ebs.Encrypted).toBe(true)
    }
  })

  it('keeps RDS private, encrypted, protected and backed up', () => {
    template.hasResourceProperties('AWS::RDS::DBInstance', {
      PubliclyAccessible: false,
      StorageEncrypted: true,
      DeletionProtection: true,
      BackupRetentionPeriod: 14,
      DBInstanceClass: 'db.t4g.small',
    })
  })

  it('forces TLS on every database connection', () => {
    template.hasResourceProperties('AWS::RDS::DBParameterGroup', {
      Parameters: { 'rds.force_ssl': '1' },
    })
  })

  it('creates no NAT gateway, load balancer or Lambda (EC2 + RDS only)', () => {
    template.resourceCountIs('AWS::EC2::NatGateway', 0)
    template.resourceCountIs('AWS::ElasticLoadBalancingV2::LoadBalancer', 0)
    template.resourceCountIs('AWS::Lambda::Function', 0)
  })
})
