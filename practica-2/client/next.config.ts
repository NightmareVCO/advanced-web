import type { NextConfig } from 'next';

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

export default nextConfig;
