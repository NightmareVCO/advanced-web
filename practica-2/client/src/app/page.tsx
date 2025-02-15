'use client';

import { StickyScroll } from '@components/StickyScrollReveal/StickyScrollReveal';
import { Button, Image } from '@heroui/react';
import { Icon } from '@iconify/react';
import Routes from '@lib/data/routes.data';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import Images from '@lib/data/images.data';
import { MacbookScroll } from '@/components/MacbookScroll/MacbookScroll';

const content = [
	{
		title: 'Create a fake API',
		description:
			'Create a fake API in a few seconds to test your front-end. Mockify is an API mockup tool for developers. It helps you to create a fake API in a few seconds to test your front-end.',
		content: <Image src={Images.FIRST} alt={Images.FIRST} />,
	},
	{
		title: 'Test your API response',
		description:
			'Test in real-time your API response. You can vary the response time, the status code, and the response body. You can also add headers to your response.',
		content: (
			<div className="h-full w-full  flex items-center justify-center text-white">
				<Image src={Images.SECOND} alt={Images.SECOND} />,
			</div>
		),
	},
	{
		title: 'Protect your endpoints with JWT',
		description:
			'Protect your endpoints with JWT. You can add a JWT token to your request and protect your endpoints. You can also add a token expiration time.',
		content: (
			<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
				<Image src={Images.THIRD} alt={Images.THIRD} />,
			</div>
		),
	},
	{
		title: 'Keep your endpoint unauthorized',
		description:
			'If no JWT token is provided, the endpoint will return a 401 status code. You can customize the response body and the response time.',
		content: (
			<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
				<Image src={Images.FOURTH} alt={Images.FOURTH} />,
			</div>
		),
	},
	{
		title: 'Modify your headers',
		description:
			'You can add headers to your request. You can also modify the response headers. You can add as many headers as you want.',
		content: (
			<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
				<Image src={Images.FIFTH} alt={Images.FIFTH} />,
			</div>
		),
	},
	{
		title: 'Explore all your projects',
		description:
			'You can explore all your projects and endpoints. You can also edit and delete your projects and endpoints. You can also add users to your projects.',
		content: (
			<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
				<Image src={Images.SIXTH} alt={Images.SIXTH} />,
			</div>
		),
	},
	{
		title: 'Manage your projects with your team',
		description:
			'You can add users to your projects. They will be able to test your endpoints. You can also remove users from your projects.',
		content: (
			<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
				<Image src={Images.SEVENTH} alt={Images.SEVENTH} />,
			</div>
		),
	},
	{
		title: 'Explore community projects',
		description:
			'You can explore community projects. You can test their endpoints and see their response. Soon you will be able to fork their projects.',
		content: (
			<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
				<Image src={Images.EIGHTH} alt={Images.EIGHTH} />,
			</div>
		),
	},
	{
		title: 'Change your language',
		description:
			'You can change your language. You can choose between English and Spanish. You can also suggest a new language.',
		content: (
			<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
				<Image src={Images.NINTH} alt={Images.NINTH} />,
			</div>
		),
	},
	{
		title: 'Thanks you for using Mockify',
		content: (
			<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
				<Image src={Images.FIRST} alt={Images.FIRST} />,
			</div>
		),
	},
];

export default function Page() {
	const t = useTranslations('home');
	return (
		<div className="relative flex min-h-dvh w-full flex-col overflow-hidden overflow-y-auto">
			<main className="flex flex-col items-center rounded-2xl px-3 md:rounded-3xl md:px-0">
				<section className="z-20 pt-24 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
					<Button
						className="h-9 overflow-hidden border-1 border-default-100 bg-default-50 px-[18px] py-2 text-small font-normal leading-5 text-default-500"
						endContent={
							<Icon
								className="flex-none outline-none [&>path]:stroke-[2]"
								icon="solar:arrow-right-linear"
								width={20}
							/>
						}
						radius="full"
						variant="bordered"
					>
						{t('onboarding')}
					</Button>
					<div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
						<div className="bg-hero-section-title bg-clip-text text-transparent dark:from-[#FFFFFF] dark:to-[#FFFFFF66]">
							{t('title1')} <br/> {t('title2')}
						</div>
					</div>
					<p className="text-center font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]">
						{t('description')}
					</p>
					<div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
						<Button
							size="lg"
							className="h-10 w-[163px] bg-primary px-[16px] py-[10px] text-small font-medium leading-5"
							radius="full"
							as={Link}
							href={Routes.Projects}
						>
							{t('getStarted')}
						</Button>
					</div>
				</section>
				{/* <div className="z-20 mt-auto w-[calc(100%-calc(theme(spacing.4)*2))] max-w-6xl overflow-hidden rounded-2xl rounded-tr-2xl border-1 border-[#FFFFFF1A] bg-background bg-opacity-0 p-4">
					<Image src={Images.FIRST} alt={Images.FIRST} />
				</div> */}

				<div className="overflow-hidden w-full">
					<MacbookScroll src={Images.FIRST} showGradient={false} />
				</div>

				<div className="w-full max-w-7xl mt-40 mb-20">
					<div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
						<div className="bg-hero-section-title bg-clip-text py-4 text-transparent dark:from-[#FFFFFF66] dark:to-[#FFFFFF]">
							Explore our features
						</div>
					</div>

					<StickyScroll content={content} />
				</div>
			</main>
		</div>
	);
}
