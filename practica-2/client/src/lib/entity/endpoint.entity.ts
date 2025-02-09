import type { Method } from '@lib/data/method.data';

export type Endpoint = {
	id: number;
	name: string;
	description: string;
	path: string;
	method: Method;
	status: boolean;
	delay: string;
	security: boolean;
	expirationDate: string;
	encoding: string;
	responseType: string;
	responseStatus: string;
	projectId: number;
};

export default Endpoint;
