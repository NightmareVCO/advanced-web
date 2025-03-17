import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react';

import { useState } from 'react';
import Calendar from '../Calendar/Calendar';

export default function ReservationModal() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isComplete, setIsComplete] = useState(false);

	const size = isComplete ? 'sm' : '5xl';
	const buttonColor = isComplete ? 'primary' : 'danger';
	const buttonLabel = isComplete ? 'Salir' : 'Cancelar Reservación';

	const handleClose = () => {
		setIsComplete(false);
		onOpenChange();
	};

	return (
		<>
			<Button
				onPress={onOpen}
				className="h-10 w-[163px] bg-main-color px-[50px] py-[10px] text-small font-medium leading-5 text-white"
				radius="full"
			>
				Crear Reservación
			</Button>
			<Modal
				size={size}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				className="bg-default-50"
				isDismissable={false}
				isKeyboardDismissDisabled={false}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody className="flex items-center justify-center">
								<Calendar setIsCompleted={setIsComplete} />
							</ModalBody>
							<ModalFooter>
								<Button color={buttonColor} variant="light" onPress={handleClose}>
									{buttonLabel}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
