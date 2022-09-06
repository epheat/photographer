import { Construct } from "constructs";
import { aws_cognito as cognito } from "aws-cdk-lib";

export interface PSAuthProps {
  stage?: String
}

export class PSAuth extends Construct {
  public readonly userPool: cognito.UserPool;
  public readonly client: cognito.UserPoolClient;
  // TODO: export the roles that cognito users use

  constructor(scope: Construct, id: string, props: PSAuthProps = {}) {
    super(scope, id);

    // thanks to: https://stackoverflow.com/questions/55784746/how-to-create-cognito-identitypool-with-cognito-userpool-as-one-of-the-authentic
    // and: https://github.com/bobbyhadz/aws-cdk-api-authorizer/blob/master/lib/cdk-starter-stack.ts
    this.userPool = new cognito.UserPool(this, 'ps-users', {
      userPoolName: `photographerWebsiteUsers-${props.stage || "Dev"}`,
      autoVerify: {
        email: true
      },
      selfSignUpEnabled: true
    })
    this.client = new cognito.UserPoolClient(this, 'ps-app', {
      generateSecret: false,
      userPool: this.userPool,
      userPoolClientName: `photographerWebsite-${props.stage || "Dev"}`,
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO
      ],
      oAuth: {
        flows: { implicitCodeGrant: true },
      }
    })

    // const unauthenticatedRole = new iam.Role(this, 'unauth-role', {
    //   assumedBy: new iam.ServicePrincipal('cognito-identity.amazonaws.com').withConditions({

    //   })
    // })
     
  }
}
