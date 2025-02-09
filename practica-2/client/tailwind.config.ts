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
					'linear-gradient(91deg, #FFF 32.88%, rgba(158,148,203, 0.40) 99.12%)',
			},
			flex: {
				'2': '2 2 0%',
				'3': '3 3 0%',
				'4': '4 4 0%',
			},
		},
	},
	darkMode: ['class', 'class'],
	plugins: [
		heroui({
			themes: {
				dark: {
					colors: {
						primary: {
							200: '#D3CFE7',
							300: '#9E94CB',
							400: '#6E5EB0',
							500: '#402D97',
							600: '#201087',

							DEFAULT: '#6E5EB0',
						},
					},
				},
			},
		}),
	],
} satisfies Config;
