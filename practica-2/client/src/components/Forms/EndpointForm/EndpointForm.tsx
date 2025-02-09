'use client';

import {
	Autocomplete,
	AutocompleteItem,
	Button,
	Checkbox,
	Divider,
	Form,
	Input,
	Select,
	SelectItem,
	Spacer,
	Tab,
	Tabs,
} from '@heroui/react';
import Method from '@lib/data/method.data';

import { Icon } from '@iconify/react';

import CodeEditor from '@components/CodeEditor/CodeEditor';
import FormDivider from '@components/Forms/FormDivider/FormDivider';
import ContentEncoding from '@lib/data/contentEncoding.data';
import ContentType from '@lib/data/contentType.data';
import Expiration from '@lib/data/expiration.data';
import statusCodes from '@lib/data/statusCode.data';
import type Endpoint from '@lib/entity/endpoint.entity';
import { useState } from 'react';

type EndpointFormProps = {
	endpoint?: Endpoint;
};

export default function EndpointForm({ endpoint }: EndpointFormProps) {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const prefix = 'http://localhost:3000/projects/1/api/';
	const [value, setValue] = useState(prefix);
	const [headers, setHeaders] = useState<number[]>([]);

	const [security, setSecurity] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		if (!inputValue.startsWith(prefix)) {
			setValue(prefix);
			return;
		}
		setValue(inputValue);
	};

	const handleDeleteHeader = (indexToDelete: number) => {
		setHeaders(headers.filter((_, index) => index !== indexToDelete));
	};

	return (
		<Form
			id="login-form"
			className="flex flex-col gap-3 items-center justify-center w-full max-w-7xl px-4 lg:px-8 mt-6"
			validationBehavior="native"
			onSubmit={handleSubmit}
		>
			<FormDivider title="Enter the path, method, and status of your endpoint" />

			<Input
				isRequired
				label="Path"
				name="path"
				placeholder="Enter your endpoint path"
				type="text"
				variant="bordered"
				radius="full"
				size="lg"
				value={value}
				defaultValue={endpoint?.path}
				onChange={handleChange}
			/>

			<div className="flex flex-wrap gap-4 w-full">
				<Tabs
					id="httpMethod"
					size="lg"
					fullWidth
					aria-label="Methods tabs"
					color="primary"
					radius="full"
				>
					{Object.keys(Method).map((method: string) => (
						<Tab
							key={method}
							value={method}
							title={Method[method as keyof typeof Method]}
						/>
					))}
				</Tabs>
			</div>

			<Autocomplete
				name="statusCode"
				isRequired
				variant="bordered"
				radius="full"
				defaultItems={statusCodes}
				label="Response Status"
				placeholder="Search an HTTP status code"
				size="lg"
				defaultSelectedKey={endpoint?.responseStatus}
			>
				{(statusCode) => (
					<AutocompleteItem
						key={statusCode.code}
						value={statusCode.code}
						textValue={statusCode.message}
					>
						{statusCode.message}
					</AutocompleteItem>
				)}
			</Autocomplete>

			<Spacer y={2} />
			<FormDivider title="Enter the content type and encoding of your endpoint" />

			<Select
				name="contentType"
				isRequired
				variant="bordered"
				radius="full"
				label="Content Type"
				size="lg"
				placeholder="Select a content type"
				defaultSelectedKeys={endpoint?.responseType}
			>
				{Object.keys(ContentType).map((contentType: string) => (
					<SelectItem key={contentType} value={contentType}>
						{ContentType[contentType as keyof typeof ContentType]}
					</SelectItem>
				))}
			</Select>

			<Select
				isRequired
				name="contentEncoding"
				variant="bordered"
				radius="full"
				label="Content Encoding"
				size="lg"
				placeholder="Select a content encoding"
				defaultSelectedKeys={endpoint?.encoding}
			>
				{Object.keys(ContentEncoding).map((contentEncoding: string) => (
					<SelectItem key={contentEncoding} value={contentEncoding}>
						{ContentEncoding[contentEncoding as keyof typeof ContentEncoding]}
					</SelectItem>
				))}
			</Select>

			<Spacer y={2} />
			<FormDivider title="Enter the response and headers of your endpoint" />

			<CodeEditor />
			<Spacer y={2} />

			<div className="flex w-full items-center justify-start">
				<Button
					className="bg-primary font-medium text-white"
					color="secondary"
					radius="full"
					variant="flat"
					startContent={
						<Icon
							className="flex-none text-white/60"
							icon="lucide:plus"
							width={16}
						/>
					}
					onPress={() => setHeaders([...headers, Date.now()])}
				>
					Add Header
				</Button>
			</div>
			{headers.length > 0 && (
				<>
					<Spacer y={1} />
					<Divider />

					<Spacer y={1} />
				</>
			)}

			{headers.map((headerId, index) => (
				<div
					key={headerId}
					className="flex flex-col gap-4 w-full items-center justify-center"
				>
					<div className="flex gap-x-2 md:flex-row w-full items-center justify-center">
						<div className="flex flex-col md:flex-row gap-4 w-full">
							<Input
								isRequired
								label={`Key (Header #${index + 1})`}
								name={`headerKey-${index}`}
								placeholder={`Enter your #${index + 1} header key`}
								type="text"
								variant="bordered"
								radius="full"
								size="lg"
							/>

							<Input
								isRequired
								label={`Value (Header #${index + 1})`}
								name={`headerValue-${index}`}
								placeholder={`Enter your #${index + 1} header value`}
								type="text"
								variant="bordered"
								radius="full"
								size="lg"
							/>
						</div>
						<Button
							color="danger"
							radius="full"
							variant="light"
							size="lg"
							isIconOnly
							onPress={() => handleDeleteHeader(index)}
						>
							<Icon
								className="flex-none text-red-500"
								icon="lucide:x"
								width={16}
							/>
						</Button>
					</div>
					<Spacer y={1} />
					<Divider />
					<Spacer y={1} />
				</div>
			))}

			<Spacer y={2} />
			<FormDivider title="Enter the security, delay and expiration of your endpoint" />

			<div className="flex w-full items-center justify-start">
				<Checkbox
					name="remember"
					isSelected={security}
					defaultChecked={endpoint?.security}
					onChange={() => setSecurity(!security)}
				>
					Use JWT to validate the request
				</Checkbox>
			</div>

			{/* {security && (
				<Input
					isRequired={security}
					label="JWT Token"
					name="jwtToken"
					placeholder="Enter your JWT token"
					type="text"
					variant="bordered"
					radius="full"
					size="lg"
				/>
			)} */}

			<Input
				isRequired
				isClearable
				label="Delay (in seconds)"
				name="delay"
				placeholder="Enter your endpoint delay"
				type="number"
				defaultValue={endpoint?.delay ? endpoint.delay.toString() : '0'}
				min={0}
				variant="bordered"
				radius="full"
				size="lg"
			/>

			<Select
				isRequired
				name="expirationDate"
				variant="bordered"
				radius="full"
				label="Expiration Date"
				size="lg"
				placeholder="Select an expiration date"
				defaultSelectedKeys={endpoint?.expirationDate}
			>
				{Object.keys(Expiration).map((expirationDate: string) => (
					<SelectItem key={expirationDate} value={expirationDate}>
						{Expiration[expirationDate as keyof typeof Expiration]}
					</SelectItem>
				))}
			</Select>

			<Spacer y={2} />
			<FormDivider title="Enter the name and description of your endpoint" />

			<Input
				isRequired
				isClearable
				label="Name"
				name="name"
				placeholder="Enter your endpoint name"
				type="text"
				minLength={2}
				variant="bordered"
				radius="full"
				size="lg"
				defaultValue={endpoint?.name}
			/>

			<Input
				isRequired
				isClearable
				label="Description"
				name="description"
				placeholder="Enter your endpoint description"
				type="text"
				minLength={5}
				variant="bordered"
				radius="full"
				size="lg"
				defaultValue={endpoint?.description}
			/>

			<Spacer y={2} />
			<Button
				type="submit"
				color="primary"
				radius="full"
				variant="solid"
				size="lg"
			>
				Create Endpoint
			</Button>
		</Form>
	);
}
