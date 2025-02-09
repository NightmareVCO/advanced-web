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
import type User from '@lib/entity/user.entity';

type DeleteEndpointModalProps = {
	user: User;
	setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function DeleteUserModal({
	user,
	setSelectedUser,
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
								<h2 className="text-lg font-medium">Delete User</h2>
							</ModalHeader>
							<ModalBody>
								<p className="text-default-400">
									{user.firstName} {user.lastName} - ({user.email})
								</p>
								<p className="text-default-400">
									Are you sure you want to delete this user?
								</p>
							</ModalBody>
							<ModalFooter>
								<Button
									color="default"
									radius="full"
									variant="light"
									onPress={() => {
										setSelectedUser(null);
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
