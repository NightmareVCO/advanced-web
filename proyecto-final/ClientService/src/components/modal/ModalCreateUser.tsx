'use client';

import {
	Button,
	Form,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	type ModalProps,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import React, { useActionState, useState, useTransition } from 'react';

import { createUser } from '@/lib/actions/register.action';

const ModalUser = React.forwardRef<
	HTMLDivElement,
	Omit<ModalProps, 'children'> & {}
>(({ isOpen, onClose, onOpenChange, ...props }, ref) => {
	const [isVisible, setIsVisible] = useState(false);
	const [passwordError, setPasswordError] = useState('');

	const toggleVisibility = () => setIsVisible(!isVisible);

	const [_, startTransition] = useTransition();

	const [{ errors }, formAction, pending] = useActionState(createUser, {
		errors: {
			firstName: '',
			lastName: '',
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (password !== confirmPassword) {
			setPasswordError('Passwords do not match');
			return;
		}

		startTransition(async () => {
			formAction(formData);
			if (onClose) onClose();
		});
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} {...props} ref={ref}>
			<ModalContent>
				<ModalHeader className="flex-col pt-8">
					<h1 className="font-semibold text-large">Create a User</h1>
					<p className="font-normal text-small text-default-700">
						Share your experience with this product
					</p>
				</ModalHeader>
				<ModalBody className="pb-8">
					<Form
						id="user-form"
						className="flex flex-col w-full gap-3"
						validationBehavior="native"
						// @ts-ignore
						validationErrors={errors}
						onSubmit={onSubmit}
					>
						{/* Name fields in a single row */}
						<div className="flex w-full gap-2">
							<Input
								isRequired
								label="First Name"
								name="firstName"
								placeholder="Enter your first name"
								variant="flat"
								isInvalid={!!errors.firstName}
								errorMessage={errors.firstName}
							/>
							<Input
								isRequired
								label="Last Name"
								name="lastName"
								placeholder="Enter your last name"
								variant="flat"
								isInvalid={!!errors.lastName}
								errorMessage={errors.lastName}
							/>
						</div>

						<Input
							isRequired
							label="Email Address"
							name="email"
							placeholder="Enter your email"
							type="email"
							variant="flat"
							isInvalid={!!errors.email}
							errorMessage={errors.email}
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
							isInvalid={!!errors.confirmPassword}
							errorMessage={errors.confirmPassword}
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
							isInvalid={!!passwordError || !!errors.confirmPassword}
							errorMessage={passwordError || errors.confirmPassword}
						/>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						form="user-form"
						className="text-white"
						color="primary"
						type="submit"
						isDisabled={pending}
						isLoading={pending}
					>
						Create User
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
});

ModalUser.displayName = 'ModalUser';

export default ModalUser;
