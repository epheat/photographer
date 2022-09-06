// Auth-related functions. These can only be use on authorized APIs (i.e. ones that require an access token).
// These functions can inspect the JWT further, and allow/deny access based on its contents.

import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import middy from '@middy/core';
import { deny } from "./responses";

export interface UserInfo {
    username: string,
    sub: string,
    groups: string[]
}

/**
 * returns whether the access token is a member of the specified group.
 */
export const userHasGroup = (event: APIGatewayProxyEventV2, group: string): boolean => {
    const { groups } = getUserInfo(event);
    return groups.includes(group);
}

/**
 * returns whether the access token is scoped to the particular user sub (uuid).
 */
export const userIs = (event: APIGatewayProxyEventV2, resourceSub: string): boolean => {
    const { sub } = getUserInfo(event);
    return sub === resourceSub;
}

/**
 * generic way to retrieve some user info from an access token.
 */
export const getUserInfo = (event: APIGatewayProxyEventV2): UserInfo => {
    const token = event.requestContext.authorizer?.jwt!;
    return <UserInfo>{
        username: token.claims.username,
        sub: token.claims.sub,
        groups: token.claims["cognito:groups"] ?? [],
    }
}
