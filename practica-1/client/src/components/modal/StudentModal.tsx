import { createStudent, updateStudent } from '@/lib/actions/student.action';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react';
import { Method, type StudentPackage } from '@type/types';
import React, { useActionState } from 'react';
import StudentForm from '../form/Form';

type StudentModalProps = {
	studentPackage: StudentPackage;
};

export default function StudentModal({ studentPackage }: StudentModalProps) {
	const { student, setStudent, method, setMethod } = studentPackage;
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const actionToPerform = student ? updateStudent : createStudent;
	const [{ errors }, formAction, isPending] = useActionState(actionToPerform, {
		errors: {},
	});

	React.useEffect(() => {
		if (
			student !== undefined &&
			(method === Method.Add ||
				method === Method.Edit ||
				method === Method.View) &&
			!isOpen
		) {
			onOpen();
		}
	}, [student, method, isOpen, onOpen]);

	return (
		<>
			<Button
				className="h-10 w-[163px] bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
				onPress={onOpen}
			>
				Add new student
			</Button>
			<Modal
				// Use only the disclosure state here
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
								<h2 className="text-2xl font-bold">
									{Method.View === method
										? 'View this student'
										: student
											? 'Modify this student'
											: 'Add new student'}
								</h2>
								<p className="text-sm text-default-500">
									Please fill in the information below.
								</p>
							</ModalHeader>
							<ModalBody>
								<StudentForm
									student={student}
									formAction={formAction}
									errors={errors}
									justWatch={Method.View === method}
								/>
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
									form="student-form"
									type="submit"
									isLoading={isPending}
									isDisabled={isPending || Method.View === method}
									onPress={() => {
										if (errors) return;

										setTimeout(() => {
											setStudent(undefined);
											setMethod(Method.Add);
											onClose();
										}, 1000);
									}}
									className="h-10 bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
								>
									{student ? 'Modify' : 'Add'}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
