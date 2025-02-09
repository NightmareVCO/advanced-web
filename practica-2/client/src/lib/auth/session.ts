import 'server-only'
import { cookies } from 'next/headers'
 
export async function createSession(jwt: string, expiresAt: Date) {
  const cookieStore = await cookies()
 
  cookieStore.set('session', jwt, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}