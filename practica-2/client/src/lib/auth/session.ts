import 'server-only';
import { type JWTPayload, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = 'zgI4sCmHU5ticRe9ecLJst0EYzIjewEVHJ3xPwQ/5Kg=';
const encodedKey = new TextEncoder().encode(secretKey);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function createSession(payload: any) {
	const cookieStore = await cookies();

	cookieStore.set('session', payload, {
		httpOnly: true,
		secure: true,
		expires: payload.expiresIn,
		sameSite: 'lax',
		path: '/',
	});
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete('session');
}

export async function decrypt(session: string | undefined = ''): Promise<JWTPayload | Error> {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		});
		return payload;
	} catch (error) {
		return new Error(`Invalid session ${error}`);
	}
}
