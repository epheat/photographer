import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PSBackendStack } from './ps-backend-stack';
import { PSWebsiteStack } from './ps-website-stack';

export interface PSAppStageProps extends StageProps {
  domain: String
}
const defaultProps: PSAppStageProps = {
  domain: "Dev",
}

export class PSAppStage extends Stage {
  constructor(scope: Construct, id: string, props: PSAppStageProps = defaultProps) {
    super(scope, id, props);
    const backendStack = new PSBackendStack(this, 'ps-backend', {
      domain: props.domain,
    });
    const websiteStack = new PSWebsiteStack(this, 'ps-website', {
      domain: props.domain,
    });
  }
}