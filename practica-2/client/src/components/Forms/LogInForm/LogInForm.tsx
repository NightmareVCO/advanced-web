'use client';

import { Button, Checkbox, Form, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import { logIn } from '@lib/actions/logIn.action';
import { useTranslations } from 'next-intl';
import React, { startTransition, useActionState } from 'react';

export default function LogInForm() {
	const [isVisible, setIsVisible] = React.useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const [{ errors }, action, pending] = useActionState(logIn, {
		errors: { login: '' },
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;

		startTransition(() => {
			if (form.checkValidity()) {
				const formData = new FormData(form);
				action(formData);
			} else {
				form.reportValidity();
			}
		});
	};

	const t = useTranslations('loginForm');

	return (
		<Form
			id="login-form"
			className="flex flex-col gap-3 items-center"
			validationBehavior="native"
			validationErrors={errors}
			onSubmit={handleSubmit}
		>
			<Input
				isRequired
				label={t('usernameLabel')}
				name="username"
				placeholder={t('usernamePlaceholder')}
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
				label={t('passwordLabel')}
				name="password"
				placeholder={t('passwordPlaceholder')}
				type={isVisible ? 'text' : 'password'}
				variant="bordered"
				size="lg"
				radius="full"
			/>
			<Button
				className="bg-primary font-medium text-white w-1/2"
				radius="full"
				variant="flat"
				color="primary"
				type="submit"
				isDisabled={pending}
				isLoading={pending}
			>
				{t('buttonLogin')}
			</Button>
			{errors?.login && (
				<p className="text-default-400 text-sm text-center capitalize">
					{errors?.login}
				</p>
			)}
		</Form>
	);
}
