import { type Filter, FilterTypeEnum } from '@lib/data/filter.data';

      // - "Classic"
      // - "Comic/Graphic Novel"
      // - "Crime/Detective"
      // - "Fable"
      // - "Fairy tale"
      // - "Fanfiction"
      // - "Fantasy"
      // - "Fiction narrative"
      // - "Fiction in verse"
      // - "Folklore"
      // - "Historical fiction"
      // - "Horror"
      // - "Humor"
      // - "Legend"
      // - "Metafiction"
      // - "Mystery"
      // - "Mythology"
      // - "Mythopoeia"
      // - "Realistic fiction"
      // - "Science fiction"
      // - "Short story"
      // - "Suspense/Thriller"
      // - "Tall tale"
      // - "Western"
      // - "Biography/Autobiography"
      // - "Essay"
      // - "Narrative nonfiction"
      // - "Speech"
      // - "Textbook"
      // - "Reference book"

const ecommerceItems: Filter[] = [
	{
		type: FilterTypeEnum.PriceRange,
		title: 'Price Range',
		range: {
			min: 0,
			defaultValue: [100, 500],
			max: 2000,
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
        value: 'comic',
      },
      {
        title: 'Crime/Detective',
        value: 'crime',
      },
      {
        title: 'Fable',
        value: 'fable',
      },
      {
        title: 'Fairy tale',
        value: 'fairy_tale',
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
        value: 'fiction_narrative',
      },
      {
        title: 'Fiction in verse',
        value: 'fiction_in_verse',
      },
      {
        title: 'Folklore',
        value: 'folklore',
      },
      {
        title: 'Historical fiction',
        value: 'historical_fiction',
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
        value: 'realistic_fiction',
      },
      {
        title: 'Science fiction',
        value: 'science_fiction',
      },
      {
        title: 'Short story',
        value: 'short_story',
      },
      {
        title: 'Suspense/Thriller',
        value: 'suspense_thriller',
      },
      {
        title: 'Tall tale',
        value: 'tall_tale',
      },
      {
        title: 'Western',
        value: 'western',
      },
      {
        title: 'Biography/Autobiography',
        value: 'biography_autobiography',
      },
      {
        title: 'Essay',
        value: 'essay',
      },
      {
        title: 'Narrative nonfiction',
        value: 'narrative_nonfiction',
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
        value: 'reference_book',
      },
		],
	}
];

export default ecommerceItems;
