import * as cdk from '@aws-cdk/core';
import { PSWebsiteStack } from './ps-website-stack';

export interface PSAppStageProps extends cdk.StageProps {

}

export class PSAppStage extends cdk.Stage {
  constructor(scope: cdk.Construct, id: string, props?: PSAppStageProps) {
    super(scope, id, props);
    const websiteStack = new PSWebsiteStack(this, 'ps-website');
  }
}