import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization as string;

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token not present.',
    });
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return response.status(401).json({
      message: 'Token not present.',
    });
  }

  try {
    const decoded = jwt.verify(token, auth.secret) as TokenPayload;

    request.user = { id: decoded.sub };

    next();
  } catch (err) {
    throw new Error('Token not valid.');
  }
};
