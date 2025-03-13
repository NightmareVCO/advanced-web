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
				'hero-section-title':
					'linear-gradient(91deg, #FFF 32.88%, rgba(255, 255, 255, 0.40) 99.12%)',
			},
		},
	},
	darkMode: 'class',
	plugins: [heroui()],
};
