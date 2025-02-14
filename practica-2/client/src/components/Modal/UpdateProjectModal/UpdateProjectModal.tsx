import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react';
import type { Project } from '@lib/entity/project.entity';

type UpdateProjectModalProps = {
	pending: boolean;
	project: Project;
};

export default function UpdateProjectModal({
	pending,
	project,
}: UpdateProjectModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button
				form="project-form"
				className="bg-primary font-medium text-white"
				color="secondary"
				radius="full"
				isLoading={pending}
				isDisabled={pending}
				onPress={onOpen}
			>
				Update
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Update Project
							</ModalHeader>
							<ModalBody>
								<p className="text-sm text-default-500">
									Previous name: {project.name}
								</p>
								<p className="text-sm text-default-500">
									Previous description: {project.desc}
								</p>
								<p className="text-sm text-default-500">
									Are you sure you want to update this project?
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
									Update
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
