// tailwind.config.js
const { heroui } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		// ...
		// make sure it's pointing to the ROOT node_module
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'hero-section-title': 'linear-gradient(91deg, #2F2E41 37%, rgba(107, 98, 255, 1) 80%)',
			},
			colors: {
				'main-color': '#6B62FF',
				'secondary-color': '#2F2E41',
			},
		},
	},
	darkMode: 'class',
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: '#6B62FF',
						},
						secondary: {
							DEFAULT: '#2F2E41',
						},
					},
				},
				dark: {
					colors: {
						primary: {
							DEFAULT: '#6B62FF',
						},
						secondary: {
							DEFAULT: '#2F2E41',
						},
					},
				},
			},
		}),
	],
};
