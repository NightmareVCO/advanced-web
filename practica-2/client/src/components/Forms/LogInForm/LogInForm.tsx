'use client';

import { logIn } from '@lib/actions/logIn.action';
import { Button, Checkbox, Form, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import React, { useActionState } from 'react';

export default function LogInForm() {
	const [isVisible, setIsVisible] = React.useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const [{ errors }, action, pending] = useActionState(logIn, {
		errors: {},
	});

	return (
		<Form
			id="login-form"
			className="flex flex-col gap-3 items-center"
			validationBehavior="native"
			validationErrors={errors}
			action={action}
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
				<Checkbox name="remember">Remember me</Checkbox>
			</div>
			{errors.login && (
				<p className="text-red-500 text-sm text-center capitalize">
					{errors.login}
				</p>
			)}
			<Button
				className="bg-primary font-medium text-white w-1/2"
				radius="full"
				variant="flat"
				color="primary"
				type="submit"
				isDisabled={pending}
				isLoading={pending}
			>
				Log In
			</Button>
		</Form>
	);
}
