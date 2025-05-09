export type Slide = {
	id: number;
	title: string;
	description: string;
	img: string;
	url: string;
	bg: string;
};

export const slides: Slide[] = [
	{
		id: 1,
		title: 'Fiction Books',
		description: 'Starting at RD$500!',
		img: '/images/hero-cover-1.webp',
		url: '/catalog?genre=fiction+narrative#books',
		bg: 'bg-gradient-to-r from-secondary to-primary',
	},
	{
		id: 2,
		title: 'Classics & Self-Help',
		description: 'From just RD$650!',
		img: '/images/hero-cover-2.webp',
		url: '/catalog?genre=fiction+narrative#books',
		bg: 'bg-gradient-to-r from-primary via-primary/70 to-primary',
	},
	{
		id: 3,
		title: 'Fantasy & Adventure',
		description: 'Explore from RD$750!',
		img: '/images/hero-cover-3.webp',
		url: '/catalog?genre=fantasy#books',
		bg: 'bg-gradient-to-r from-secondary to-primary',
	},
];
