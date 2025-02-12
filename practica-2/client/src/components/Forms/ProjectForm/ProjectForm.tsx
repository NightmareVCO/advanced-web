import { Checkbox, Form, Input, Select, SelectItem } from '@heroui/react';

import Endpoints from '@lib/data/endpoints.data';
import type { Project } from '@lib/entity/project.entity';

type ProjectFormProps = {
	project?: Project;
	errors: Record<string, string>;
	action: (payload: FormData) => void;
	pending: boolean;
};

export default function ProjectForm({
	project,
	errors,
	action,
	pending,
}: ProjectFormProps) {
	return (
		<Form
			id="project-form"
			className="flex flex-col gap-3 items-center justify-center w-full p-4"
			validationBehavior="native"
			validationErrors={errors}
			action={action}
		>
			<Input
				isRequired
				label="Project Name"
				name="projectName"
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
				name="projectDescription"
				placeholder="Enter your project description"
				type="text"
				variant="bordered"
				size="lg"
				radius="full"
				defaultValue={project?.desc}
			/>

			{!project && (
				<Select
					name="projectType"
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
			)}

			<div className="flex w-full items-center justify-between px-1 py-2">
				<Checkbox defaultSelected={project?.isPublic} name="isPublic">
					Make this project public
				</Checkbox>
			</div>
		</Form>
	);
}
