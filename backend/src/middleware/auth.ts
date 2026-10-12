import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
  };
}

export const requireAdminApi = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized', message: 'Missing or malformed token' });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    // The secret is enforced to exist at server startup, but typescript needs fallback or non-null assertion
    const secret = process.env.BACKEND_JWT_SECRET as string;

    // Verify token and explicit algorithm, audience, and issuer
    const decoded = jwt.verify(token, secret, {
      algorithms: ['HS256'],
      audience: 'apnacars-express',
      issuer: 'apnacars-nextjs'
    }) as any;

    if (!decoded.id || !decoded.role || !decoded.email) {
      res.status(401).json({ error: 'Unauthorized', message: 'Token missing required claims' });
      return;
    }

    if (decoded.role !== 'ADMIN') {
      res.status(403).json({ error: 'Forbidden', message: 'Insufficient permissions' });
      return;
    }

    // Explicit check against the DB to ensure user wasn't deactivated since token creation.
    // (As per Phase 26C.1 instructions to prefer checking authorization state against DB).
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, isActive: true, role: true }
    });

    if (!user || !user.isActive || user.role !== 'ADMIN') {
      res.status(403).json({ error: 'Forbidden', message: 'User is inactive or demoted' });
      return;
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email
    };

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Unauthorized', message: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Unauthorized', message: 'Invalid token signature or configuration' });
    } else {
      res.status(500).json({ error: 'Internal Server Error', message: 'Authentication processing failed' });
    }
  }
};
