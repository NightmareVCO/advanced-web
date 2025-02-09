'use client';

import UserModal from '@components/Modal/UserModal';
import { Button, useDisclosure } from '@heroui/react';
import { Icon } from '@iconify/react';
import type User from '@lib/entity/user.entity';

export default function UserModalSection() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
				New User
			</Button>
			<UserModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
		</>
	);
}
