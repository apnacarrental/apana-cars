import 'server-only';
import { getAuthSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

// Note: Ensure BACKEND_JWT_SECRET is set in .env
const BACKEND_JWT_SECRET = process.env.BACKEND_JWT_SECRET;

function signJwt(payload: any, secret: string) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  
  const payloadToSign = {
    ...payload,
    iss: 'apnacars-nextjs',
    aud: 'apnacars-express',
    exp: Math.floor(Date.now() / 1000) + 300 // 5 minutes expiration
  };
  const encodedPayload = Buffer.from(JSON.stringify(payloadToSign)).toString('base64url');
  
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto.createHmac('sha256', secret).update(signatureInput).digest('base64url');
  
  return `${signatureInput}.${signature}`;
}

export async function getBackendToken(): Promise<string> {
  if (!BACKEND_JWT_SECRET) {
    throw new Error('Server configuration error: BACKEND_JWT_SECRET is missing');
  }

  const session = await getAuthSession();
  if (!session?.user?.email) {
    throw new Error('Unauthorized: No active session');
  }

  // Strictly revalidate that the user is active and has ADMIN role directly from the DB
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true, isActive: true, email: true }
  });

  if (!user || !user.isActive || user.role !== 'ADMIN') {
    throw new Error('Forbidden: User is inactive or lacks ADMIN privileges');
  }

  // Issue short-lived token natively via crypto to avoid dependency conflicts
  const token = signJwt({
    id: user.id,
    role: user.role,
    email: user.email,
  }, BACKEND_JWT_SECRET);

  return token;
}



