import * as cdk from '@aws-cdk/core';
import * as pipelines from '@aws-cdk/pipelines'

export interface PSPipelineStackProps extends cdk.StackProps {
  name: string;
}

export class PSPipelineStack extends cdk.Stack {
  public readonly pipeline: pipelines.CodePipeline;

  constructor(scope: cdk.Construct, id: string, props: PSPipelineStackProps) {
    super(scope, id, props);

    this.pipeline = new pipelines.CodePipeline(this, 'ps-pipeline', {
      pipelineName: props.name,
      crossAccountKeys: false,
      dockerEnabledForSynth: true,
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.connection('epheat/photographer-site', 'main', {
          connectionArn: 'arn:aws:codestar-connections:us-east-1:854299661720:connection/2c2673db-4c57-4448-8d00-2d5d37777a14'
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    });

  }
}