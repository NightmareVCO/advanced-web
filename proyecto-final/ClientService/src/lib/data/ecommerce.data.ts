import { type Filter, FilterTypeEnum } from '@lib/data/filter.data';

const ecommerceItems: Filter[] = [
	{
		type: FilterTypeEnum.PriceRange,
		title: 'Price Range',
		range: {
			min: 200,
			defaultValue: [200, 1000],
			max: 1000,
			step: 1,
		},
	},
	{
		type: FilterTypeEnum.CheckboxGroup,
		title: 'Categories',
		defaultOpen: true,
		options: [
			{
				title: 'Classic',
				value: 'classic',
			},
			{
				title: 'Comic/Graphic Novel',
				value: 'comic/graphic novel',
			},
			{
				title: 'Crime/Detective',
				value: 'crime/detective',
			},
			{
				title: 'Fable',
				value: 'fable',
			},
			{
				title: 'Fairy tale',
				value: 'fairy tale',
			},
			{
				title: 'Fanfiction',
				value: 'fanfiction',
			},
			{
				title: 'Fantasy',
				value: 'fantasy',
			},
			{
				title: 'Fiction narrative',
				value: 'fiction narrative',
			},
			{
				title: 'Fiction in verse',
				value: 'fiction in verse',
			},
			{
				title: 'Folklore',
				value: 'folklore',
			},
			{
				title: 'Historical fiction',
				value: 'historical fiction',
			},
			{
				title: 'Horror',
				value: 'horror',
			},
			{
				title: 'Humor',
				value: 'humor',
			},
			{
				title: 'Legend',
				value: 'legend',
			},
			{
				title: 'Metafiction',
				value: 'metafiction',
			},
			{
				title: 'Mystery',
				value: 'mystery',
			},
			{
				title: 'Mythology',
				value: 'mythology',
			},
			{
				title: 'Mythopoeia',
				value: 'mythopoeia',
			},
			{
				title: 'Realistic fiction',
				value: 'realistic fiction',
			},
			{
				title: 'Science fiction',
				value: 'science fiction',
			},
			{
				title: 'Short story',
				value: 'short story',
			},
			{
				title: 'Suspense/Thriller',
				value: 'suspense/thriller',
			},
			{
				title: 'Tall tale',
				value: 'tall tale',
			},
			{
				title: 'Western',
				value: 'western',
			},
			{
				title: 'Biography/Autobiography',
				value: 'biography/autobiography',
			},
			{
				title: 'Essay',
				value: 'essay',
			},
			{
				title: 'Narrative nonfiction',
				value: 'narrative nonfiction',
			},
			{
				title: 'Speech',
				value: 'speech',
			},
			{
				title: 'Textbook',
				value: 'textbook',
			},
			{
				title: 'Reference book',
				value: 'reference book',
			},
		],
	},
];

export default ecommerceItems;
