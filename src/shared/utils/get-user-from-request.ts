/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import clerkClient from '@clerk/clerk-sdk-node';
import { verifyTokenFromRequest } from './verify-token-from-request';

export async function getUserFromRequest(request: Request) {
  const decodedToken = verifyTokenFromRequest(request) as { sub: string };

  const user = await clerkClient.users.getUser(decodedToken.sub);

  return user;
}
