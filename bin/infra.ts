#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PSPipelineStack } from '../lib/ps-pipeline-stack';
import { PSAppStage } from '../lib/ps-app-stage';

const app = new cdk.App();

const defaultEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const delivery = new PSPipelineStack(app, 'PS-DeliveryPipeline', {
  name: 'PhotographerSiteDeliveryPipeline',
  env: defaultEnv,
});

const devStage = new PSAppStage(app, 'DevStage', {
  domain: "Dev",
  env: defaultEnv,
})

// const prodStage = new PSAppStage(app, 'ProdStage', {
//   domain: "Prod",
//   env: defaultEnv,
// })

delivery.pipeline.addStage(devStage);

// delivery.pipeline.addStage(prodStage);
