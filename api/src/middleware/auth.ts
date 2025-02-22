import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

type TokenPayload = {
  sub: {
    id: string;
  };
  iat: number;
  exp: number;
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // We want just the token from string "Bearer token"
  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, 'secret');
    const {
      sub: { id },
    } = decoded as unknown as TokenPayload;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
