import { pipelines as pipelines } from 'aws-cdk-lib'
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface PSPipelineStackProps extends StackProps {
  name: string;
}

export class PSPipelineStack extends Stack {
  public readonly pipeline: pipelines.CodePipeline;

  constructor(scope: Construct, id: string, props: PSPipelineStackProps) {
    super(scope, id, props);

    this.pipeline = new pipelines.CodePipeline(this, 'ps-pipeline', {
      pipelineName: props.name,
      crossAccountKeys: false,
      dockerEnabledForSynth: true,
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.connection('epheat/photographer-site', 'main', {
          // unfortunately this has to be hardcoded.
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