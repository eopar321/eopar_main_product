import { App } from 'aws-cdk-lib'

import { EoparStack } from '../lib/eopar-stack.js'

// Synth only in Phase 0 — nothing is deployed until the owner approves costs (brief §12A, Phase 8).
const app = new App()
const region = 'ap-south-1'

new EoparStack(app, 'Eopar-Staging', {
  env: { region },
  stage: 'staging',
  instanceSize: 'small',
})

new EoparStack(app, 'Eopar-Production', {
  env: { region },
  stage: 'production',
  instanceSize: 'medium',
})
