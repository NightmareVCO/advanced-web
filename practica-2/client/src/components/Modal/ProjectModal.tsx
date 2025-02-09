import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react';

import ProjectForm from '@components/Forms/ProjectForm/ProjectForm';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';

type ProjectModalProps = {
	isModalOpenFromParent: boolean;
	setIsModalOpenFromParent: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProjectModal({
	isModalOpenFromParent,
	setIsModalOpenFromParent,
}: ProjectModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	useEffect(() => {
		if (isModalOpenFromParent && !isOpen) {
			onOpen();
			setIsModalOpenFromParent(false);
		}
	}, [isModalOpenFromParent, isOpen, onOpen, setIsModalOpenFromParent]);

	return (
		<>
			<Button
				className="bg-primary font-medium text-white"
				color="secondary"
				onPress={onOpen}
				startContent={
					<Icon
						className="flex-none text-white/60"
						icon="lucide:plus"
						width={16}
					/>
				}
				radius="full"
				variant="flat"
			>
				New Project
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false}
				isKeyboardDismissDisabled={false}
				size="xl"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Create New Project
							</ModalHeader>
							<ModalBody>
								<ProjectForm />
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									radius="full"
									variant="light"
									onPress={() => {
										onClose();
										setIsModalOpenFromParent(false);
									}}
								>
									Close
								</Button>
								<Button
									form="project-form"
									className="bg-primary font-medium text-white"
									color="secondary"
									radius="full"
								>
									Create
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
