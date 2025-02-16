import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
	let locale = 'en';

	const cookieLocale = (await cookies()).get('MYNEXTAPP_LOCALE')?.value;

	if (cookieLocale) {
		locale = cookieLocale;
	} else {
		const browserLocale = (await headers())
			.get('accept-language')
			?.split(',')[0]
			.slice(0, 2);
		if (browserLocale) {
			locale = browserLocale;
		}
	}

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default,
	};
});
