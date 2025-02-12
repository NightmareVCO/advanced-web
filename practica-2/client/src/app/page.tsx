'use client';

import { Button, Image } from '@heroui/react';
import { Icon } from '@iconify/react';
import Routes from '@lib/data/routes.data';
import Link from 'next/link';
import React from 'react';

export default function Page() {
	return (
		<div className="relative flex min-h-dvh w-full flex-col overflow-hidden overflow-y-auto">
			<main className="flex flex-col items-center rounded-2xl px-3 md:rounded-3xl md:px-0">
				<section className="z-20 my-14 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
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
						New onboarding experience
					</Button>
					<div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
						<div className="bg-hero-section-title bg-clip-text text-transparent dark:from-[#FFFFFF] dark:to-[#FFFFFF66]">
							Easiest way to <br /> mock your API's.
						</div>
					</div>
					<p className="text-center font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]">
						Mockify is an API's mockup tool for developers. It helps you to
						create a fake API in a few seconds to test your front-end.
					</p>
					<div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
						<Button
							size="lg"
							className="h-10 w-[163px] bg-primary px-[16px] py-[10px] text-small font-medium leading-5"
							radius="full"
							as={Link}
							href={Routes.Projects}
						>
							Get Started
						</Button>
						{/* <Button
              className="h-10 w-[163px] border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5"
              endContent={
                <span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full bg-default-100">
                  <Icon
                    className="text-default-500 [&>path]:stroke-[1.5]"
                    icon="solar:arrow-right-linear"
                    width={16}
                  />
                </span>
              }
              radius="full"
              variant="bordered"
            >
              See our plans
            </Button> */}
					</div>
				</section>
				<div className="z-20 mt-auto w-[calc(100%-calc(theme(spacing.4)*2))] max-w-6xl overflow-hidden rounded-tl-2xl rounded-tr-2xl border-1 border-b-0 border-[#FFFFFF1A] bg-background bg-opacity-0 p-4">
					<Image src="/mockify.png" />
				</div>
			</main>
		</div>
	);
}
