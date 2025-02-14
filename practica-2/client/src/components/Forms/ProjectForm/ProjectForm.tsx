import { Checkbox, Form, Input, Select, SelectItem } from '@heroui/react';
import type { AuthPackage } from '@lib/entity/auth.entity';

import Endpoints from '@lib/data/endpoints.data';
import type { Project } from '@lib/entity/project.entity';
import { useEffect, useState } from 'react';

type ProjectFormProps = {
	authPackage: AuthPackage;
	project?: Project;
	errors: Record<string, string>;
	action: (payload: FormData) => void;
	pending: boolean;
};

export default function ProjectForm({
	authPackage,
	project,
	errors,
	action,
}: ProjectFormProps) {
	const [openAccess, setOpenAccess] = useState(false);

	useEffect(() => {
		if (project) {
			setOpenAccess(project.openAccess);
		}
	}, [project]);

	return (
		<Form
			id="project-form"
			className="flex flex-col gap-3 items-center justify-center w-full p-4"
			validationBehavior="native"
			validationErrors={errors}
			action={action}
		>
			<input type="hidden" name="projectId" defaultValue={project?.id} />
			<input type="hidden" name="owner" defaultValue={authPackage.username} />
			<input type="hidden" name="jwt" defaultValue={authPackage.jwt} />
			<Input
				isRequired
				label="Project Name"
				name="name"
				placeholder="Enter your project name"
				type="text"
				variant="bordered"
				size="lg"
				radius="full"
				defaultValue={project?.name}
			/>
			<Input
				isRequired
				label="Project Description"
				name="desc"
				placeholder="Enter your project description"
				type="text"
				variant="bordered"
				size="lg"
				radius="full"
				defaultValue={project?.desc}
			/>

			{!project ? (
				<Select
					name="tag"
					isRequired={!project}
					label="Type of Project"
					placeholder="Select the type of project"
					variant="bordered"
					size="lg"
					radius="full"
				>
					{Object.keys(Endpoints)
						.filter((key) => Number.isNaN(Number(key)))
						.map((endpoint) => (
							<SelectItem key={endpoint}>{endpoint}</SelectItem>
						))}
				</Select>
			) : (
				<input type="hidden" name="tag" defaultValue={project.tag} />
			)}

			<div className="flex w-full items-center justify-between px-1 py-2">
				<Checkbox
					defaultSelected={project?.openAccess}
					onValueChange={setOpenAccess}
				>
					Make this project public
				</Checkbox>
				<input type="hidden" value={String(openAccess)} name="openAccess" />
			</div>
		</Form>
	);
}
