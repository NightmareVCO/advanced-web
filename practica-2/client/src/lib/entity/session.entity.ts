import type { JWTPayload } from "jose";

export interface AuthPayload extends JWTPayload {
    userId: string;
    role?: string;
}