import type User from '@lib/entity/user.entity';

import {
	Button,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
	User as UserUI,
	useDisclosure,
} from '@heroui/react';
import React from 'react';

import EditIcon from '@components/Icons/EditIcon';
import DeleteUserModal from '@components/Modal/DeleteModals/DeleteUserModal';
import RemoveUserFromTeam from '@components/Modal/RemoveUserFromTeam/RemoveUserFromTeam';
import UserModal from '@components/Modal/UserModal';
import type { AuthPackage } from '@lib/entity/auth.entity';

export const columns = [
	{ name: 'User', uid: 'firstName' },
	{ name: 'Username', uid: 'username' },
	{ name: 'Role', uid: 'role' },
	{ name: 'Status', uid: 'status' },
	{ name: 'Actions', uid: 'actions' },
];

type UsersTableProps = {
	authPackage: AuthPackage;
	users: User[];
	noEdit?: boolean;
	isProject?: boolean;
};

const statusColorMap = {
	active: 'success',
	inactive: 'danger',
};

export default function UsersTable({
	authPackage,
	users,
	noEdit,
	isProject,
}: UsersTableProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

	const renderCell = React.useCallback(
		(user: User, columnKey: keyof User | string) => {
			const cellValue = user[columnKey as keyof User];

			switch (columnKey) {
				case columns[0].uid:
					return (
						<UserUI
							avatarProps={{
								isDisabled: true,
								color: 'secondary',
							}}
							description={user.email}
							name={`${cellValue} ${user.lastName}`}
						>
							{user.email}
						</UserUI>
					);
				case columns[1].uid:
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize ml-6">{cellValue}</p>
						</div>
					);
				case columns[2].uid: {
					const rolesArray = Array.from(user.roles);
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize">
								{/* @ts-ignore */}
								{rolesArray[0]?.name}
							</p>
						</div>
					);
				}

				case columns[3].uid:
					return (
						<Chip
							className="capitalize"
							color={
								statusColorMap[user.active ? 'active' : 'inactive'] as
									| 'success'
									| 'danger'
							}
							size="sm"
							variant="flat"
						>
							{user.active ? 'Active' : 'Inactive'}
						</Chip>
					);
				case columns[4].uid:
					return (
						<div className="relative flex items-center justify-center gap-2">
							{!noEdit && (
								<Tooltip content="Edit">
									<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
										<Button
											color="default"
											variant="light"
											isIconOnly
											size="lg"
											onPress={() => {
												setSelectedUser(user);
												onOpen();
											}}
										>
											<EditIcon />
										</Button>
									</span>
								</Tooltip>
							)}
							{isProject && (
								<RemoveUserFromTeam
									user={user}
									setSelectedUser={setSelectedUser}
								/>
							)}
							{!isProject && (
								<DeleteUserModal
									authPackage={authPackage}
									user={user}
									setSelectedUser={setSelectedUser}
								/>
							)}
						</div>
					);
				default:
					return cellValue;
			}
		},
		[onOpen, noEdit, isProject, authPackage],
	);

	return (
		<>
			<Table aria-label="Endpoints Table">
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							className="p-3"
							key={column.uid}
							align={column.uid === 'actions' ? 'center' : 'start'}
						>
							<Chip variant="bordered">
								<span className="font-bold">{column.name}</span>
							</Chip>
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={users}>
					{(user) => (
						<TableRow key={user.id}>
							{(columnKey) => (
								<TableCell>{renderCell(user, columnKey as string)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
			<UserModal
				actionToPerform="edit"
				authPackage={authPackage}
				user={selectedUser || undefined}
				setUser={setSelectedUser}
				isOpen={isOpen}
				onOpen={onOpen}
				onOpenChange={onOpenChange}
			/>
		</>
	);
}
