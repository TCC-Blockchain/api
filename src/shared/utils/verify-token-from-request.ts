import { Request } from 'express';
import jwt from 'jsonwebtoken';

export function verifyTokenFromRequest(request: Request) {
  const token = request.headers.authorization?.split('Bearer ')[1];
  const decoded = jwt.verify(
    token || '',
    process.env.CLERK_PEM_PUBLIC_KEY || '',
  );

  return decoded;
}
