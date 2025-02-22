import { Method } from './method.data';

export const MethodColor: Record<Method, string> = {
	[Method.GET]: 'bg-success',
	[Method.POST]: 'bg-secondary',
	[Method.PUT]: 'bg-warning',
	[Method.DELETE]: 'bg-danger',
	[Method.PATCH]: 'bg-primary',
	[Method.OPTIONS]: 'bg-default',
};

export default MethodColor;
