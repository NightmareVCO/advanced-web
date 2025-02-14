import DeleteIcon from '@/components/Icons/DeleteIcon';
import { deleteUser } from '@/lib/actions/users.action';
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
import type { AuthPackage } from '@lib/entity/auth.entity';
import type User from '@lib/entity/user.entity';
import { useActionState } from 'react';

type DeleteEndpointModalProps = {
	authPackage: AuthPackage;
	user: User;
	setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function DeleteUserModal({
	authPackage,
	user,
	setSelectedUser,
}: DeleteEndpointModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [{ errors }, action, pending] = useActionState(deleteUser, {
		errors: {},
	});

	return (
		<>
			<Tooltip color="danger" content="Delete">
				<Button
					isDisabled={String(user?.id) === authPackage.userId}
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
								<Form
									id="delete-user-form"
									validationBehavior="native"
									validationErrors={errors}
									action={action}
								>
									<input type="hidden" name="id" value={user.id} />
									<input
										type="hidden"
										name="jwt"
										defaultValue={authPackage.jwt}
									/>
									<p className="text-default-400">
										{user.firstName} {user.lastName} - ({user.email})
									</p>
									<p className="text-default-400">
										Are you sure you want to delete this user?
									</p>
								</Form>
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
								<Button
									form="delete-user-form"
									isDisabled={
										pending || String(user?.id) === authPackage.userId
									}
									isLoading={pending}
									type="submit"
									color="danger"
									radius="full"
								>
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
