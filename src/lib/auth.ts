"use server"

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

// Secret key ko .env file mein daalna best practice hai, par abhi fallback diya hai
const secretKey = process.env.JWT_SECRET || 'royal-collection-secret-123';
const key = new TextEncoder().encode(secretKey);

export async function verifyAuth(token: string) {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error) {
    return null; 
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

  const session = await new SignJWT({ userId, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);

  const cookieStore = await cookies()
  cookieStore.set('session', session , {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}