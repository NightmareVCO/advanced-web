import { decrypt } from '@lib/auth/session';
import type { AuthPackage } from '@lib/entity/auth.entity';
import type { JWTPayload } from 'jose';

export const getAuthUser = async (
	jwt: string,
): Promise<[AuthPackage, Error | null]> => {
	const session: JWTPayload | Error = await decrypt(jwt);
	if (session instanceof Error) {
		return [{} as AuthPackage, session];
	}
	const authPackage: AuthPackage = {
		username: session.username as string,
		roles: session.roles as string,
		isAdmin: String(session.roles).includes('ADMIN'),
		userId: session.userId as string,
		jwt: jwt,
	};
	return [authPackage, null];
};
