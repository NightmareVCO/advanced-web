import { heroui } from '@heroui/react';
import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'hero-section-title':
					'linear-gradient(91deg, #FFF 32.88%, rgba(255, 255, 255, 0.40) 99.12%)',
			},
		},
	},
	darkMode: 'class',
	plugins: [heroui()],
} satisfies Config;
