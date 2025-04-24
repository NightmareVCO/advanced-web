import 'server-only';
import type { JWTPayload } from 'jose';
import { decrypt } from '../actions/session.action';

export type UserSession = {
	id: string;
	username: string;
	roles: string[];
	isAdmin: boolean;
	expiresIn: Date;
};

export const getUserSession = async (
	jwt: string | undefined = '',
): Promise<UserSession | null> => {
	try {
		const payload: JWTPayload | Error = await decrypt(jwt);

		if (payload instanceof Error) {
			throw new Error(`Invalid session ${payload}`);
		}

		const userSession: UserSession = {
			id: payload.userId as string,
			username: payload.username as string,
			roles: [payload.roles as string],
			isAdmin: payload.roles === 'ADMIN',
			expiresIn: new Date((payload.exp as number) * 1000),
		};

		return userSession;
	} catch (error) {
		return null;
	}
};
