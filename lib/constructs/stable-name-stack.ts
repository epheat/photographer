/**
 * Stack implementation that allocates logicalIds of stateful resources based on their resource name.
 * This will allow resources like s3 buckets and dynamoDb tables to be refactored into other constructs, while
 * maintaining their logicalId and thus not being replaced.
 *
 * inspiration from: https://gist.github.com/foriequal0/f1f4ea279fb64836e5fb38efefa133d7
 */
import { CfnElement, Stack } from "aws-cdk-lib";

export class StableStack extends Stack {
  /**
   * Overrides the way a stack constructs logicalIds.
   * By default, it will be a concatenation of all constructs ids in the tree, followed by a generated hash.
   * see: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.Stack.html#protected-allocatewbrlogicalwbridcfnelement
   * @param element
   * @protected
   */
  protected allocateLogicalId(element: CfnElement): string {
    // TODO
    return super.allocateLogicalId(element);
  }
}