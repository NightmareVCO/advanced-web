import DeleteIcon from '@/components/Icons/DeleteIcon';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from '@heroui/react';
import type Endpoint from '@lib/entity/endpoint.entity';

type DeleteEndpointModalProps = {
	endpoint: Endpoint;
	setSelectedEndpoint: React.Dispatch<React.SetStateAction<Endpoint | null>>;
};

export default function DeleteEndpointModal({
	endpoint,
	setSelectedEndpoint,
}: DeleteEndpointModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Tooltip color="danger" content="Delete">
				<Button
					color="default"
					variant="light"
					isIconOnly
					size="lg"
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
								<h2 className="text-lg font-medium">Delete Endpoint</h2>
							</ModalHeader>
							<ModalBody>
								<p className="text-default-400">
									{endpoint.name} - {endpoint.path}
								</p>
								<p className="text-default-400">
									Are you sure you want to delete this endpoint?
								</p>
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
									Cancel
								</Button>
								<Button color="danger" radius="full" onPress={() => {}}>
									Delete
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
