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
import { useEffect, useState } from 'react';
import { DeleteIcon } from '../Icons/Icons';
import type { Reservation } from '../Table/Table';

interface DeleteReservationModalProps {
	reservation: Reservation;
}

export default function DeleteReservationModal({ reservation }: DeleteReservationModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isDeletionAccepted, setIsDeletionAccepted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleDelete = () => {
		setIsDeletionAccepted(true);
	};

	useEffect(() => {
		if (isDeletionAccepted) {
			const deleteReservation = async () => {
				setIsLoading(true);
				try {
					const response = await fetch(
						`https://4u0zfu3fha.execute-api.us-east-2.amazonaws.com/reservations/${reservation.id}`,
						{
							method: 'DELETE',
						},
					);

					if (response.ok) {
						setIsLoading(false);
						onOpenChange();
						setIsDeletionAccepted(false);
						location.reload();
					}
				} catch (error) {
					console.error(error);
					setIsLoading(false);
				}
			};

			deleteReservation();
		}
	}, [isDeletionAccepted, onOpenChange, reservation.id]);

	return (
		<>
			<Button isIconOnly className="bg-transparent" onPress={onOpen}>
				<Tooltip color="danger" content="Borrar reserva">
					<span className="text-lg cursor-pointer text-danger active:opacity-50">
						<DeleteIcon />
					</span>
				</Tooltip>
			</Button>
			<Modal
				size="lg"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				className="bg-default-50"
				isDismissable={false}
				isKeyboardDismissDisabled={false}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>
								<h1 className="text-xl font-semibold text-default-foreground">
									¿Estás seguro de que deseas eliminar esta reservación?
								</h1>
							</ModalHeader>
							<ModalBody className="flex items-center justify-center">
								<p className="text-default-500">
									La reservación de {reservation.name} para el{' '}
									{`${reservation.schedule.day}/${reservation.schedule.month}/${reservation.schedule.year}`}{' '}
									a las {`${reservation.schedule.hour}`} será eliminada. Esta acción no se puede
									deshacer.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									isDisabled={isLoading}
									isLoading={isLoading}
									onPress={handleDelete}
								>
									Eliminar Reservación
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
