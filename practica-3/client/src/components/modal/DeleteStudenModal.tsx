import { deleteStudent } from '@actions/student.action';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	form,
	useDisclosure,
} from '@heroui/react';
import { Method, type StudentPackage } from '@type/types';
import React, { useActionState } from 'react';

type DeleteStudentModalProps = {
	studentPackage: StudentPackage;
};

export default function DeleteStudentModal({
	studentPackage,
}: DeleteStudentModalProps) {
	const { student, setStudent, method, setMethod } = studentPackage;
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [{ errors }, formAction, isPending] = useActionState(deleteStudent, {
		errors: {},
	});

	React.useEffect(() => {
		if (student !== undefined && method === Method.Delete) {
			onOpen();
		}
	}, [student, onOpen, method]);

	if (!student) return null;

	return (
		<Modal
			isOpen={isOpen}
			isDismissable={false}
			isKeyboardDismissDisabled={false}
			hideCloseButton
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							<h2 className="text-2xl font-bold">{'Delete Student'}</h2>
						</ModalHeader>
						<ModalBody>
							<p className="text-sm text-default-500">
								Are you sure you want to delete this student?
							</p>
							<p>
								{student?.firstName} {student?.lastName} - ({student?.matricula}
								)
							</p>
						</ModalBody>
						<ModalFooter>
							<Button
								color="danger"
								variant="light"
								onPress={() => {
									setStudent(undefined);
									setMethod(Method.Add);
									onClose();
								}}
							>
								Dismiss
							</Button>
							<Button
								onPress={() => {
									const formData = new FormData();
									formData.append('id', student.id.toString());
									React.startTransition(() => {
										formAction(formData);
									});

									setTimeout(() => {
										setStudent(undefined);
										setMethod(Method.Add);
										onClose();
									}, 1000);
								}}
								isDisabled={isPending}
								isLoading={isPending}
								className="h-10 bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
							>
								Delete
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
