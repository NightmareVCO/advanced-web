import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@heroui/react';
import type User from '@lib/entity/user.entity';

type AddToUserToTeam = {
	pending: boolean;
	username: string;
};

export default function AddToUserToTeam({
	pending,
	username,
}: AddToUserToTeam) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button
				form="project-form"
				className="bg-primary font-medium text-white"
				color="secondary"
				radius="full"
				isLoading={pending}
				isDisabled={pending || !username}
				onPress={onOpen}
			>
				Add to Team
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Add this user to the team
							</ModalHeader>
							<ModalBody>
								<p className="text-sm text-default-500">User: {username}</p>
								<p className="text-sm text-default-500">
									Are you sure you want to add this user?
								</p>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									radius="full"
									variant="light"
									onPress={onClose}
								>
									Close
								</Button>
								<Button
									form="project-form"
									type="submit"
									className="bg-primary font-medium text-white"
									color="secondary"
									radius="full"
									isDisabled={pending}
									isLoading={pending}
								>
									Add
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
