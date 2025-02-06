"use client";

import React from "react";
import {Button, Input, Checkbox, Link, Divider, Form} from "@heroui/react";
import {Icon} from "@iconify/react";
import BrandLogoIcon from "@icons/BrandLogoIcon";

export default function Component() {
	const [isVisible, setIsVisible] = React.useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("handleSubmit");
	};

	return (
		<div
			className="flex min-h-[48rem] h-screen flex-col w-full items-center justify-center overflow-hidden rounded-small bg-content1 p-2 sm:p-4 lg:p-8"
			style={{
				backgroundImage:
					"url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/black-background-texture.jpeg)",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Testimonial */}
			<div className="absolute bottom-10 left-10 hidden md:block">
				<p className="max-w-xl text-white/60">
					<span className="font-medium">“</span>
					¡Un cambio de juego! 🚀 Esta app hace que probar APIs sea rápido y sin complicaciones.
					Simula respuestas al instante, sin depender de servidores. ¡Simple, potente y esencial!
					<span className="font-medium">”</span>
				</p>
			</div>

			{/* Login Form */}
			<div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-12 shadow-small">
				<p className="pb-2 text-xl font-medium text-center">Log In</p>
				<Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
					<Input
						isRequired
						label="Username"
						name="username"
						placeholder="Enter your Username"
						type="text"
						variant="bordered"
						size="lg"
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
						type={isVisible ? "text" : "password"}
						variant="bordered"
						size="lg"
					/>
					<div className="flex w-full items-center justify-between px-1 py-2">
						<Checkbox name="remember" size="lg">
							Remember me
						</Checkbox>
					</div>
					<Button className="w-full" color="primary" type="submit">
						Log In
					</Button>
				</Form>
			</div>
		</div>
	);
}
