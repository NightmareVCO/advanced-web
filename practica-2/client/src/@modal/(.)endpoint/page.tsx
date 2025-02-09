'use client';

import {
	Button,
	Form,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@heroui/react';
import React from 'react';

import EndpointForm from '@components/Forms/EndpointForm/EndpointForm';
import { useRouter } from 'next/navigation';

export default function CreateEndpointPage() {
	const router = useRouter();

	return (
		<Modal
			isDismissable={false}
			isKeyboardDismissDisabled={false}
			isOpen={true}
			size="full"
			onClose={() => router.back()}
		>
			<ModalContent>
				<>
					<ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
					<ModalBody>
						<EndpointForm />
					</ModalBody>
					<ModalFooter>
						<Button
							color="danger"
							variant="light"
							onPress={() => router.back()}
						>
							Close
						</Button>
						<Button color="primary">Action</Button>
					</ModalFooter>
				</>
			</ModalContent>
		</Modal>
	);
}
