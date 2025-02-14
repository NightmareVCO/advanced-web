'use client';

import ProjectModal from '@components/Modal/ProjectModal';
import { useState } from 'react';

import type { AuthPackage } from '@/lib/entity/auth.entity';
import { useSearchParams } from 'next/navigation';

type ProjectModalClientWrapperProps = {
	authPackage: AuthPackage;
};

export default function ProjectModalClientWrapper({
	authPackage,
}: ProjectModalClientWrapperProps) {
	const searchParams = useSearchParams();
	const isModalOpenFromParent = searchParams.get('create') === 'true';
	const [isModalOpen, setIsModalOpen] = useState(isModalOpenFromParent);

	return (
		<ProjectModal
			authPackage={authPackage}
			isModalOpenFromParent={isModalOpen}
			setIsModalOpenFromParent={setIsModalOpen}
		/>
	);
}
