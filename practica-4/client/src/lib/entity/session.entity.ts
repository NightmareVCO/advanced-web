import type { JWTPayload } from 'jose';

export interface AuthPayload extends JWTPayload {
	userId: string;
	roles?: string;
}
