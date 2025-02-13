import type { NextConfig } from 'next';
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				hostname: 'nextuipro.nyc3.cdn.digitaloceanspaces.com',
				protocol: 'https',
			},
		],
	},
};

export default withNextIntl(nextConfig);
