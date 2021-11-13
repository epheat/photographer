import * as cdk from '@aws-cdk/core';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import * as amplify from "@aws-cdk/aws-amplify";

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, "amplify-app", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "epheat",
        repository: "photographer",
        oauthToken: cdk.SecretValue.secretsManager("GithubToken", {
          jsonField: "token",
        }),
      }),
    });
    const mainBranch = amplifyApp.addBranch("main");
  }
}
