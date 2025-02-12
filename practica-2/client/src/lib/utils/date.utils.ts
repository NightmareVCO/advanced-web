import Expiration from '@lib/data/expiration.data';

//transform the code in time in 2025-02-12T00:00:00 format
export const parseExpirationTime = (expiration: string): Date => {
	switch (expiration) {
		case Expiration.ONE_HOUR:
			return new Date(Date.now() + 60 * 60 * 1000);
		case Expiration.ONE_DAY:
			return new Date(Date.now() + 24 * 60 * 60 * 1000);
		case Expiration.ONE_WEEK:
			return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		case Expiration.ONE_MONTH:
			return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
		default:
			return new Date(Date.now() + 60 * 60 * 1000);
	}
};
