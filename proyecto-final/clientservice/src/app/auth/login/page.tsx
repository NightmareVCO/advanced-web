'use client';

import {
	Button,
	Checkbox,
	Divider,
	Form,
	Input,
	Link,
	User,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { NavbarLinks } from '@lib/constants/navbar.constants';
import React from 'react';

export default function Component() {
	const [isVisible, setIsVisible] = React.useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('handleSubmit');
	};

	return (
		<main className="flex flex-row w-screen h-screen gap-y-6">
			{/* Login Form */}
			<div className="container flex items-center justify-center w-full lg:w-1/2">
				<div className="flex flex-col items-center w-full max-w-md gap-4 px-4 py-12 border shadow-lg bg-background rounded-medium">
					<div className="w-full text-left">
						<p className="pb-2 text-2xl font-medium text-center text-primary">
							Welcome Back
						</p>
						<p className="text-center text-medium text-default-800">
							Log in to your account to continue
						</p>
					</div>

					<Form
						className="flex flex-col w-full gap-3"
						validationBehavior="native"
						onSubmit={handleSubmit}
					>
						<Input
							isRequired
							label="Email Address"
							name="email"
							placeholder="Enter your email"
							type="email"
							variant="flat"
						/>
						<Input
							isRequired
							endContent={
								<button type="button" onClick={toggleVisibility}>
									{isVisible ? (
										<Icon
											className="text-2xl pointer-events-none text-default-800"
											icon="solar:eye-closed-linear"
										/>
									) : (
										<Icon
											className="text-2xl pointer-events-none text-default-800"
											icon="solar:eye-bold"
										/>
									)}
								</button>
							}
							label="Password"
							name="password"
							placeholder="Enter your password"
							type={isVisible ? 'text' : 'password'}
							variant="flat"
						/>
						<div className="flex items-center justify-between w-full px-1 py-2">
							<Checkbox
								className="data[selected=true]:text-white"
								name="remember"
								size="sm"
							>
								Remember for 15 days
							</Checkbox>
							{/* <Link className="text-default-800" href="#" size="sm">
								Forgot password?
							</Link> */}
						</div>
						<Button className="w-full text-white" color="primary" type="submit">
							Log In
						</Button>
					</Form>

					<p className="text-center text-medium">
						Need to create an account?&nbsp;
						<Link href={NavbarLinks.SIGNUP} size="sm">
							Sign Up
						</Link>
					</p>
				</div>
			</div>

			{/* Right side */}
			<div className="container relative h-[88vh] flex-col-reverse hidden w-1/2 p-10 my-4 overflow-hidden bg-center bg-cover mx-7 rounded-medium shadow-small lg:flex bg-hero-background-2">
				<div className="flex flex-col items-end gap-4">
					<User
						avatarProps={{
							src: '/images/vladimircuriel.webp',
						}}
						classNames={{
							base: 'flex flex-row-reverse',
							name: 'w-full text-right text-white',
							description: 'text-white',
						}}
						description="Founder & Developer at BookHive"
						name="Vladimir Curiel"
					/>
					<p className="w-full text-2xl text-right text-white">
						<span className="font-medium">“</span>
						<span className="italic font-normal">
							BookHive have been one of the biggest projects I've ever worked
							in. It's a great project!
						</span>
						<span className="font-medium">”</span>
					</p>
				</div>
			</div>
		</main>
	);
}
