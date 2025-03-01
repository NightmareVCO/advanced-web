const { heroui } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				body: 'rgb(var(--color-bg))',
				'box-bg': 'rgb(var(--color-box))',
				'box-shadow': 'rgb(var(--box-sd))',
				'box-border': 'rgb(var(--box-border))',
				primary: '#1d4ed8',
				'heading-1': 'rgb(var(--heading-1))',
				'heading-2': 'rgb(var(--heading-2))',
				'heading-3': 'rgb(var(--heading-3))',
			},
			screens: {
				midmd: '880px',
			},
		},
	},
	darkMode: 'class',
	plugins: [heroui()],
};
