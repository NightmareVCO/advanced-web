// {
//     "statusCode": 401,
//     "timestamp": "2025-04-23T17:47:02.292+00:00",
//     "message": "Invalid credentials",
//     "description": "uri=/api/v1/auth/login/"
// }

export type ErrorResponse = {
	statusCode: number;
	timestamp: string;
	message: string;
	description: string;
};

export const API_URL = process.env.NEXT_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';
