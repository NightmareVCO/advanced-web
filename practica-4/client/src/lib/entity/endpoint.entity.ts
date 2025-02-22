import type { Method } from '@lib/data/method.data';
import type { Header } from '@lib/entity/header.entity';

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
	body: string;
	responseType: string;
	jwt: string;
	responseStatus: string;
	projectId: number;
	headers: Header[];
};

export default Endpoint;
