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

import { createEndpoint, updateEndpoint } from '@/lib/actions/endpoint.action';
import CodeEditor from '@components/CodeEditor/CodeEditor';
import FormDivider from '@components/Forms/FormDivider/FormDivider';
import {
	API_PATH,
	PROJECTS_PATH,
	SERVER_PATH,
} from '@lib/constants/server.constants';
import ContentEncoding from '@lib/data/contentEncoding.data';
import ContentType from '@lib/data/contentType.data';
import Expiration from '@lib/data/expiration.data';
import statusCodes from '@lib/data/statusCode.data';
import type { AuthPackage } from '@lib/entity/auth.entity';
import type Endpoint from '@lib/entity/endpoint.entity';
import {
	startTransition,
	useActionState,
	useCallback,
	useEffect,
	useState,
} from 'react';
import {useTranslations} from "next-intl";

type EndpointFormProps = {
	authPackage?: AuthPackage;
	endpoint?: Endpoint;
	projectId: string;
};

export default function EndpointForm({
	authPackage,
	endpoint,
	projectId,
}: EndpointFormProps) {
	const prefix = `${SERVER_PATH}/${PROJECTS_PATH}/${projectId}/${API_PATH}/`;
	// Limpia la ruta de entrada
	let rawPath = endpoint?.path ?? '';

	if (rawPath.includes(SERVER_PATH)) {
		// Elimina cualquier parte del servidor y api/v1
		rawPath = rawPath.replace(SERVER_PATH, '');
	}

	// Elimina cualquier patrón de projects/ID/api/
	const projectPattern = new RegExp(`${PROJECTS_PATH}/\\d+/${API_PATH}/`);
	while (rawPath.match(projectPattern)) {
		rawPath = rawPath.replace(projectPattern, '');
	}

	// Asegúrate de que no haya barras dobles y que comience sin barra
	rawPath = rawPath.replace(/\/+/g, '/').replace(/^\//, '');

	const initialValue = `${prefix}${rawPath}`;
	const initialExtension =
		endpoint?.responseType === ContentType.JSON
			? 'json'
			: endpoint?.responseType === ContentType.XML
				? 'xml'
				: 'html';

	const [value, setValue] = useState(initialValue);
	const [headers, setHeaders] = useState<number[]>([]);
	const [code, setCode] = useState<string>(endpoint?.body ?? '');
	const [currentEndpoint, setCurrentEndpoint] = useState<string>(initialValue);
	const [security, setSecurity] = useState(false);
	const [method, setMethod] = useState(Method.GET);
	const [extension, setExtension] = useState<string>(initialExtension);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		if (!inputValue.startsWith(prefix)) {
			setValue(prefix);
			return;
		}

		const editablePart = inputValue.slice(prefix.length);
		let sanitizedInput = editablePart.replace(/\/{2,}/g, '/');
		sanitizedInput = sanitizedInput.replace(/[^a-zA-Z0-9/-]/g, '');

		setValue(prefix + sanitizedInput);
	};

	const handleDeleteHeader = (indexToDelete: number) => {
		setHeaders(headers.filter((_, index) => index !== indexToDelete));
	};

	const onCodeChange = useCallback((value: string) => {
		setCode(value);
	}, []);

	const onContentTypeChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const value = event.target.value;
			console.log(event.target);
			console.log(value);
			switch (value) {
				case 'JSON':
					setExtension('json');
					break;
				case 'XML':
					setExtension('xml');
					break;
				case 'HTML':
					setExtension('html');
					break;
				default:
					setExtension('json');
			}
		},
		[],
	);

	const actionToPerform = endpoint ? updateEndpoint : createEndpoint;

	// @ts-ignore
	const [{ errors }, action, pending] = useActionState(actionToPerform, {
		errors: {
			error: '',
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;

		if (code === '') {
			errors.error = 'Please enter a response body.';
			return;
		}

		startTransition(() => {
			if (form.checkValidity()) {
				const formData = new FormData(form);
				action(formData);
			} else {
				form.reportValidity();
			}
		});
	};

	useEffect(() => {
		if (endpoint) {
			setHeaders(endpoint.headers.map(() => Date.now()));
		}
	}, [endpoint]);

	const contentTypeKey = Object.entries(ContentType).find(
		([, val]) => val === endpoint?.responseType,
	)?.[0];

	const contentEncodingKey = Object.entries(ContentEncoding).find(
		([, val]) => val === endpoint?.encoding,
	)?.[0];

	const t = useTranslations('endpointForm');

	return (
		<Form
			id="create-endpoint-form"
			className="flex flex-col gap-3 items-center justify-center w-full max-w-7xl px-4 lg:px-8 mt-6"
			validationBehavior="native"
			validationErrors={errors}
			onSubmit={handleSubmit}
		>
			<FormDivider title={t('formDividerText1')} />
			<input type="hidden" name="id" value={endpoint?.id} />
			<input type="hidden" name="jwt" defaultValue={authPackage?.jwt} />

			<Input
				isRequired
				label={t('inputPathLabel')}
				name="path"
				placeholder={t('inputPathPlaceholder')}
				type="text"
				variant="bordered"
				radius="full"
				size="lg"
				value={value}
				pattern={`${prefix}.+/`}
				errorMessage={t('inputPathErrorMessage')}
				onChange={handleChange}
			/>

			<div className="md:hidden w-full">
				<p className="text-xs text-start text-default-300">{currentEndpoint}</p>
			</div>

			<div className="flex flex-wrap gap-4 w-full">
				<Tabs
					id="httpMethod"
					size="lg"
					fullWidth
					aria-label="Methods tabs"
					color="primary"
					radius="full"
					onSelectionChange={(method) => setMethod(method as Method)}
					defaultSelectedKey={endpoint && Method[endpoint?.method]}
				>
					{Object.keys(Method).map((method: string) => (
						<Tab
							key={method}
							value={method}
							title={Method[method as keyof typeof Method]}
						/>
					))}
				</Tabs>
				<input type="hidden" name="method" value={method} />
			</div>

			<Autocomplete
				name="statusCode"
				isRequired
				variant="bordered"
				radius="full"
				defaultItems={statusCodes}
				label={t('autoCompleteLabel')}
				placeholder={t('autoCompletePlaceholder')}
				size="lg"
				defaultSelectedKey={endpoint?.responseStatus}
			>
				{(statusCode) => (
					<AutocompleteItem
						key={statusCode.code}
						value={statusCode.code}
						textValue={statusCode.code.toString()}
					>
						{statusCode.message}
					</AutocompleteItem>
				)}
			</Autocomplete>

			<Spacer y={2} />
			<FormDivider title={t('formDividerText2')} />

			<Select
				name="contentType"
				isRequired
				variant="bordered"
				radius="full"
				label={t('selectContentTypeLabel')}
				size="lg"
				placeholder={t('selectContentTypePlaceholder')}
				defaultSelectedKeys={[contentTypeKey ?? '']}
				onChange={onContentTypeChange}
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
				label={t('selectEncodingLabel')}
				size="lg"
				placeholder={t('selectEncodingPlaceholder')}
				defaultSelectedKeys={[contentEncodingKey ?? '']}
			>
				{Object.keys(ContentEncoding).map((contentEncoding: string) => (
					<SelectItem key={contentEncoding} value={contentEncoding}>
						{ContentEncoding[contentEncoding as keyof typeof ContentEncoding]}
					</SelectItem>
				))}
			</Select>

			<Spacer y={2} />
			<FormDivider title={t('formDividerText3')} />

			<div className="hidden xl:block">
				<CodeEditor
					code={code ?? ''}
					extension={extension}
					onChange={onCodeChange}
					minHeight="20rem"
					minWidth="20rem"
					width="74rem"
					maxWidth="74rem"
				/>
			</div>
			<div className="hidden lg:block xl:hidden">
				<CodeEditor
					code={code ?? ''}
					extension={extension}
					onChange={onCodeChange}
					minHeight="20rem"
					minWidth="20rem"
					width="60rem"
					maxWidth="60rem"
				/>
			</div>
			<div className="hidden md:block lg:hidden xl:hidden">
				<CodeEditor
					code={code ?? ''}
					extension={extension}
					onChange={onCodeChange}
					minHeight="20rem"
					minWidth="20rem"
					width="50rem"
					maxWidth="50rem"
				/>
			</div>
			<div className="hidden sm:block md:hidden lg:hidden xl:hidden">
				<CodeEditor
					code={code ?? ''}
					extension={extension}
					onChange={onCodeChange}
					minHeight="20rem"
					minWidth="20rem"
					width="40rem"
					maxWidth="40rem"
				/>
			</div>
			<div className="sm:hidden md:hidden lg:hidden xl:hidden">
				<CodeEditor
					code={code ?? ''}
					extension={extension}
					onChange={onCodeChange}
					minHeight="20rem"
					minWidth="20rem"
					width="25rem"
					maxWidth="25rem"
				/>
			</div>
			<input type="hidden" name="code" value={code} />
			<Spacer y={2} />

			<div className="flex w-full items-center justify-center lg:justify-start">
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
					{t('addHeaderButton')}
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
								label={t('inputHeaderKeyLabel', { index: index + 1 })}
								name={`headerKey-${index}`}
								placeholder={t('inputHeaderKeyPlaceholder', { index: index + 1 })}
								type="text"
								variant="bordered"
								radius="full"
								size="lg"
								defaultValue={endpoint?.headers[index]?.key}
							/>

							<Input
								isRequired
								label={t('inputHeaderValueLabel', { index: index + 1 })}
								name={`headerValue-${index}`}
								placeholder={t('inputHeaderValuePlaceholder', { index: index + 1 })}
								type="text"
								variant="bordered"
								radius="full"
								size="lg"
								defaultValue={endpoint?.headers[index]?.value}
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
			<FormDivider title={t('formDividerText4')} />

			<div className="flex w-full items-center justify-start">
				<Checkbox
					name="securityCheck"
					defaultSelected={endpoint?.security}
					onValueChange={(isSelected) => setSecurity(isSelected)}
				>
					{t('checkboxJWT')}
				</Checkbox>
			</div>
			<input type="hidden" name="security" value={security ? 'on' : 'off'} />

			<Input
				isRequired
				isClearable
				label={t('inputDelayLabel')}
				name="delay"
				placeholder={t('inputDelayPlaceholder')}
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
				label={t('inputExpirationLabel')}
				size="lg"
				placeholder={t('inputExpirationPlaceholder')}
				defaultSelectedKeys={endpoint?.expirationDate}
			>
				{Object.keys(Expiration).map((expirationDate: string) => (
					<SelectItem key={expirationDate} value={expirationDate}>
						{Expiration[expirationDate as keyof typeof Expiration]}
					</SelectItem>
				))}
			</Select>

			<Spacer y={2} />
			<FormDivider title={t('formDividerText5')} />

			<Input
				isRequired
				isClearable
				label={t('inputNameLabel')}
				name="name"
				placeholder={t('inputNamePlaceholder')}
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
				label={t('inputDescriptionLabel')}
				name="description"
				placeholder={t('inputDescriptionPlaceholder')}
				type="text"
				minLength={5}
				variant="bordered"
				radius="full"
				size="lg"
				defaultValue={endpoint?.description}
			/>

			<input name="projectId" type="hidden" value={projectId} />

			<Spacer y={2} />
			<Button
				form="create-endpoint-form"
				type="submit"
				color="primary"
				radius="full"
				variant="solid"
				size="lg"
				isDisabled={pending}
				isLoading={pending}
			>
				{endpoint ? t('buttonUpdate') : t('buttonCreate')}
			</Button>
			{errors?.error && (
				<p className="text-red-400 text-sm text-center capitalize">
					{errors.error}
				</p>
			)}
		</Form>
	);
}
