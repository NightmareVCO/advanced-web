'use client';

import { Accordion, AccordionItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { FAQ } from '@lib/data/faq.data';
import React from 'react';

type FAQsProps = {
	FAQs: FAQ[];
};

export default function FAQs({ FAQs }: FAQsProps) {
	return (
		<section className="container py-6">
			<div className="flex flex-col items-center w-full gap-6 mx-auto">
				<Accordion
					fullWidth
					keepContentMounted
					className="gap-3"
					itemClasses={{
						base: 'px-6 !bg-white transition hover:!bg-primary-100 shadow-lg border data-[open=true]:!bg-primary-400',
						title: 'font-medium data-[open=true]:text-white',
						trigger: 'py-4 md:py-6',
						content: 'pt-0 pb-6 text-base text-white',
						indicator: 'data-[open=true]:rotate-180',
					}}
					items={FAQs}
					selectionMode="multiple"
					variant="splitted"
				>
					{FAQs.map((FAQ) => (
						<AccordionItem
							key={FAQ.title}
							indicator={<Icon icon="solar:alt-arrow-down-linear" width={24} />}
							title={FAQ.title}
						>
							{FAQ.content}
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
