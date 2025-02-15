import DeleteIcon from '@components/Icons/DeleteIcon';
import {
	Button,
	Form,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from '@heroui/react';
import { deleteEndpoint } from '@lib/actions/endpoint.action';
import type { AuthPackage } from '@lib/entity/auth.entity';
import type Endpoint from '@lib/entity/endpoint.entity';
import { useActionState } from 'react';
import {useTranslations} from "next-intl";

type DeleteEndpointModalProps = {
	authPackage: AuthPackage;
	projectOwnerId: string;
	endpoint: Endpoint;
	setSelectedEndpoint: React.Dispatch<React.SetStateAction<Endpoint | null>>;
};

export default function DeleteEndpointModal({
	authPackage,
	projectOwnerId,
	endpoint,
	setSelectedEndpoint,
}: DeleteEndpointModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [{ errors }, action, pending] = useActionState(deleteEndpoint, {
		errors: {
			deleteEndpoint: '',
		},
	});

	const t = useTranslations('deleteEndpointModal');

	return (
		<>
			<Tooltip color="danger" content="Delete">
				<Button
					color="default"
					variant="light"
					isIconOnly
					size="lg"
					isDisabled={projectOwnerId !== authPackage.userId || !endpoint.status}
					onPress={() => {
						onOpen();
					}}
				>
					<span className="text-lg text-danger cursor-pointer active:opacity-50">
						<DeleteIcon />
					</span>
				</Button>
			</Tooltip>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false}
				isKeyboardDismissDisabled={false}
				size="md"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>
								<h2 className="text-lg font-medium">{t('modalTitle')}</h2>
							</ModalHeader>
							<ModalBody>
								<Form
									id="delete-endpoint-form"
									validationBehavior="native"
									validationErrors={errors}
									action={action}
								>
									<input type="hidden" name="id" value={endpoint.id} />
									<input
										type="hidden"
										name="jwt"
										defaultValue={authPackage.jwt}
									/>
									<p className="text-default-400">
										{endpoint.name} - {endpoint.path}
									</p>
									<p className="text-default-400">
										{t('modalConfirmation')}
									</p>
									{errors.deleteEndpoint && (
										<p className="text-danger">{errors.deleteEndpoint}</p>
									)}
								</Form>
							</ModalBody>
							<ModalFooter>
								<Button
									color="default"
									radius="full"
									variant="light"
									onPress={() => {
										setSelectedEndpoint(null);
										onClose();
									}}
								>
									{t('cancelButton')}
								</Button>
								<Button
									form="delete-endpoint-form"
									type="submit"
									color="danger"
									radius="full"
									isDisabled={pending}
									isLoading={pending}
								>
									{t('deleteButton')}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
