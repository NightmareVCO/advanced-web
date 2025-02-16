'use client';

import { MacbookScroll } from '@/components/MacbookScroll/MacbookScroll';
import type { TeamMember } from '@components/Cards/TeamMemberCard/TeamMemberCard';
import TeamMemberCard from '@components/Cards/TeamMemberCard/TeamMemberCard';
import { StickyScroll } from '@components/StickyScrollReveal/StickyScrollReveal';
import { Button, Image } from '@heroui/react';
import { Icon } from '@iconify/react';
import Images from '@lib/data/images.data';
import Routes from '@lib/data/routes.data';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export default function Page() {
	const t = useTranslations('home');

	const content = [
		{
			title: t('featuresList.first.title'),
			description: t('featuresList.first.description'),
			content: <Image src={Images.FIRST} alt={Images.FIRST} />,
		},
		{
			title: t('featuresList.second.title'),
			description: t('featuresList.second.description'),
			content: (
				<div className="h-full w-full  flex items-center justify-center text-white">
					<Image src={Images.SECOND} alt={Images.SECOND} />,
				</div>
			),
		},
		{
			title: t('featuresList.third.title'),
			description: t('featuresList.third.description'),
			content: (
				<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
					<Image src={Images.THIRD} alt={Images.THIRD} />,
				</div>
			),
		},
		{
			title: t('featuresList.fourth.title'),
			description: t('featuresList.fourth.description'),
			content: (
				<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
					<Image src={Images.FOURTH} alt={Images.FOURTH} />,
				</div>
			),
		},
		{
			title: t('featuresList.fifth.title'),
			description: t('featuresList.fifth.description'),
			content: (
				<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
					<Image src={Images.FIFTH} alt={Images.FIFTH} />,
				</div>
			),
		},
		{
			title: t('featuresList.sixth.title'),
			description: t('featuresList.sixth.description'),
			content: (
				<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
					<Image src={Images.SIXTH} alt={Images.SIXTH} />,
				</div>
			),
		},
		{
			title: t('featuresList.seventh.title'),
			description: t('featuresList.seventh.description'),
			content: (
				<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
					<Image src={Images.SEVENTH} alt={Images.SEVENTH} />,
				</div>
			),
		},
		{
			title: t('featuresList.eighth.title'),
			description: t('featuresList.eighth.description'),
			content: (
				<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
					<Image src={Images.EIGHTH} alt={Images.EIGHTH} />,
				</div>
			),
		},
		{
			title: t('featuresList.ninth.title'),
			description: t('featuresList.ninth.description'),
			content: (
				<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
					<Image src={Images.NINTH} alt={Images.NINTH} />,
				</div>
			),
		},
		{
			title: t('featuresList.tenth.title'),
			content: (
				<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
					<Image src={Images.FIRST} alt={Images.FIRST} />,
				</div>
			),
		},
	];

	const teamMembers: TeamMember[] = [
		{
			name: t('teamMembers.first.name'),
			avatar: '/vladimircuriel.webp',
			role: t('teamMembers.first.role'),
			bio: t('teamMembers.first.bio'),
			social: {
				linkedin: 'www.linkedin.com/in/vladimircuriel',
				github: 'https://github.com/NightmareVCO',
			},
		},
		{
			name: t('teamMembers.second.name'),
			avatar: '/stevenmateo.webp',
			role: t('teamMembers.second.role'),
			bio: t('teamMembers.second.bio'),
			social: {
				linkedin:
					'https://www.linkedin.com/in/steven-manuel-mateo-ramos-6626152b2/',
				github: 'https://github.com/Stevenmr22',
			},
		},
	];

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
							{t('title1')} <br /> {t('title2')}
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

				<section className="overflow-hidden w-full">
					<MacbookScroll src={Images.FIRST} showGradient={false} />
				</section>

				<section className="w-full max-w-7xl mt-40 mb-20">
					<div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
						<div className="bg-hero-section-title bg-clip-text py-4 text-transparent dark:from-[#FFFFFF66] dark:to-[#FFFFFF]">
							{t('features')}
						</div>
					</div>

					<StickyScroll content={content} />
				</section>

				<section className="w-full max-w-7xl mt-20 mb-20">
					<div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
						<div className="bg-hero-section-title bg-clip-text py-4 text-transparent dark:from-[#FFFFFF] dark:to-[#FFFFFF66]">
							{t('team')}
						</div>
					</div>

					<div className="mt-4 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
						{teamMembers.map((member, index) => (
							<TeamMemberCard key={member.name} {...member} />
						))}
					</div>
				</section>
			</main>
		</div>
	);
}
