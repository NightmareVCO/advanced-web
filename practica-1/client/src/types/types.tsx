import type { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export type Student = {
	id: number;
	firstName: string;
	lastName: string;
	matricula: string;
	email: string;
	phone: string;
};

export enum Method {
	Edit = 'edit',
	Delete = 'delete',
	Add = 'add',
}

export type StudentPackage = {
	student: Student | undefined;
	setStudent: React.Dispatch<React.SetStateAction<Student | undefined>>;
	method?: Method;
	setMethod: React.Dispatch<React.SetStateAction<Method | undefined>>;
};
