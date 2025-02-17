'use client';

import DeleteStudentModal from '@components/modal/DeleteStudenModal';
import StudentModal from '@components/modal/StudentModal';
import StudentsTable from '@components/table/Table';

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import React from 'react';

import type { Method, Student } from '@type/types';

type StudentTableProps = {
	students: Student[];
};

export default function StudentManagement({ students }: StudentTableProps) {
	const [student, setStudent] = React.useState<Student>();
	const [method, setMethod] = React.useState<Method>();

	return (
		<LazyMotion features={domAnimation}>
			<m.div
				animate="kick"
				className="flex flex-col gap-6"
				exit="auto"
				initial="auto"
				transition={{
					duration: 0.25,
					ease: 'easeInOut',
				}}
				variants={{
					auto: { width: 'auto' },
					kick: { width: 'auto' },
				}}
			>
				<AnimatePresence mode="wait">
					<m.div
						key="title"
						animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
						className="text-start text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]"
						initial={{ filter: 'blur(16px)', opacity: 0, x: 15 + 1 * 2 }}
						transition={{
							bounce: 0,
							delay: 0.01 * 10,
							duration: 0.8 + 0.1 * 8,
							type: 'spring',
						}}
					>
						<div className="bg-hero-section-title bg-clip-text text-transparent dark:from-[#FFFFFF] dark:to-[#FFFFFF66]">
							Manage your students.
						</div>
					</m.div>
				</AnimatePresence>
			</m.div>

			<m.div
				key="table"
				animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
				className="w-full mt-10 font-normal leading-7 text-start text-default-500"
				initial={{ filter: 'blur(16px)', opacity: 0, x: 15 + 1 * 3 }}
				transition={{
					bounce: 0,
					delay: 0.01 * 30,
					duration: 0.8 + 0.1 * 9,
					type: 'spring',
				}}
			>
				<StudentsTable
					studentPackage={{ student, setStudent, method, setMethod }}
					students={students}
				/>
			</m.div>

			<m.div
				key="buttons"
				animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
				className="flex flex-col justify-center w-full gap-3 mt-10 sm:flex-row md:justify-end sm:gap-6"
				initial={{ filter: 'blur(16px)', opacity: 0, x: 15 + 1 * 4 }}
				transition={{
					bounce: 0,
					delay: 0.01 * 50,
					duration: 0.8 + 0.1 * 10,
					type: 'spring',
				}}
			>
				<StudentModal
					studentPackage={{ student, setStudent, method, setMethod }}
				/>
				<DeleteStudentModal
					studentPackage={{ student, setStudent, method, setMethod }}
				/>
			</m.div>
		</LazyMotion>
	);
}
