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
			{/* Left side */}
			<div className="container relative flex-col-reverse hidden w-1/2 h-[88vh] p-10 my-4 overflow-hidden bg-center bg-cover mx-7 rounded-medium shadow-small lg:flex bg-hero-background-2">
				<div className="flex flex-col items-start gap-4">
					<User
						avatarProps={{
							src: '/images/stevenmateo.webp',
						}}
						classNames={{
							base: 'flex',
							name: 'w-full text-left text-white',
							description: 'text-white',
						}}
						description="Founder & Developer at BookHive"
						name="Steven Mateo"
					/>
					<p className="w-full text-2xl text-left text-white">
						<span className="font-medium">“</span>
						<span className="italic font-normal">
							BookHive has transformed the way I discover and share books. The
							community is vibrant, and the recommendations are spot on!
						</span>
						<span className="font-medium">”</span>
					</p>
				</div>
			</div>

			{/* Signup Form */}
			<div className="container flex items-center justify-center w-full lg:w-1/2">
				<div className="flex flex-col items-center w-full max-w-md gap-4 px-4 py-12 border shadow-lg bg-background rounded-medium">
					<div className="w-full text-left">
						<p className="pb-2 text-2xl font-medium text-center text-primary">
							Welcome to BookHive
						</p>
						<p className="text-center text-medium text-default-800">
							Join our community of book lovers and discover your next great
							read!
						</p>
					</div>

					<Form
						className="flex flex-col w-full gap-3"
						validationBehavior="native"
						onSubmit={handleSubmit}
					>
						{/* Name fields in a single row */}
						<div className="flex w-full gap-2">
							<Input
								isRequired
								label="First Name"
								name="firstName"
								placeholder="Enter your first name"
								variant="flat"
							/>
							<Input
								isRequired
								label="Last Name"
								name="lastName"
								placeholder="Enter your last name"
								variant="flat"
							/>
						</div>

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
							placeholder="Create a password"
							type={isVisible ? 'text' : 'password'}
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
							label="Confirm Password"
							name="confirmPassword"
							placeholder="Confirm your password"
							type={isVisible ? 'text' : 'password'}
							variant="flat"
						/>

						<Checkbox isRequired className="py-4" size="sm">
							I agree with the&nbsp;
							<Link className="relative z-[1]" href="#" size="sm">
								Terms
							</Link>
							&nbsp; and&nbsp;
							<Link className="relative z-[1]" href="#" size="sm">
								Privacy Policy
							</Link>
						</Checkbox>

						<Button className="w-full text-white" color="primary" type="submit">
							Sign Up
						</Button>
					</Form>

					<p className="text-center text-medium">
						Already have an account?&nbsp;
						<Link href={NavbarLinks.LOGIN} size="sm">
							Log In
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
