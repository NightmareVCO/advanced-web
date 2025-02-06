'use client';

import { Button, Checkbox, Form, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

export default function LogInForm() {
	const [isVisible, setIsVisible] = React.useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-12 mb-10 shadow-small">
			<p className="pb-2 text-2xl font-medium text-center">Log In</p>
			<Form
				className="flex flex-col gap-3 items-center"
				validationBehavior="native"
				onSubmit={handleSubmit}
			>
				<Input
					isRequired
					label="Username"
					name="username"
					placeholder="Enter your Username"
					type="text"
					variant="bordered"
					size="lg"
					radius="full"
				/>
				<Input
					isRequired
					endContent={
						<button type="button" onClick={toggleVisibility}>
							{isVisible ? (
								<Icon
									className="pointer-events-none text-2xl text-default-400"
									icon="solar:eye-closed-linear"
								/>
							) : (
								<Icon
									className="pointer-events-none text-2xl text-default-400"
									icon="solar:eye-bold"
								/>
							)}
						</button>
					}
					label="Password"
					name="password"
					placeholder="Enter your password"
					type={isVisible ? 'text' : 'password'}
					variant="bordered"
					size="lg"
					radius="full"
				/>
				<div className="flex w-full items-center justify-between px-1 py-2">
					<Checkbox name="remember" size="lg">
						Remember me
					</Checkbox>
				</div>
				<Button
					className="bg-primary font-medium text-white w-1/2"
					radius="full"
					variant="flat"
					color="primary"
					type="submit"
				>
					Log In
				</Button>
			</Form>
		</div>
	);
}
