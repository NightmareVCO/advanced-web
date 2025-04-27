'use client';
import ModalUser from '@components/modal/ModalCreateUser';
import { useMemoizedCallback } from '@components/tables/booksTable/useMemoizedCallback';
import {
	Button,
	Chip,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	User as NUser,
	Pagination,
	type Selection,
	type SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	cn,
	useDisclosure,
} from '@heroui/react';
import { ChevronDownIcon, SearchIcon } from '@heroui/shared-icons';
import type { User } from '@lib/fetch/users.fetch';
import { useCallback, useMemo, useState } from 'react';

export type UsersTableProps = {
	users: User[];
	isSmall?: boolean;
};

export const USER_COLUMNS = [
	{ uid: 'username', name: 'Username', sortable: true },
	{ uid: 'email', name: 'Email', sortable: true },
	{ uid: 'role', name: 'Role', sortable: true },
	{ uid: 'active', name: 'Active', sortable: false },
];

export function capitalize(s: string | undefined) {
	return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
}

export default function UsersTable({ users, isSmall }: UsersTableProps) {
	const [filterValue, setFilterValue] = useState('');
	const [visibleColumns, setVisibleColumns] = useState<Selection>(
		new Set(USER_COLUMNS.map((c) => c.uid)),
	);
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: 'id',
		direction: 'ascending',
	});
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

	// Handlers
	const onSearchChange = useMemoizedCallback((value?: string) => {
		setFilterValue(value || '');
		setPage(1);
	});
	const onClear = useCallback(() => {
		setFilterValue('');
		setPage(1);
	}, []);

	const onRowsPerPageChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			setRowsPerPage(Number(e.target.value));
			setPage(1);
		},
		[],
	);
	const onNextPage = useCallback(() => {
		if (page < totalPages) setPage((p) => p + 1);
	}, [page]);
	const onPreviousPage = useCallback(() => {
		if (page > 1) setPage((p) => p - 1);
	}, [page]);
	const onSortChange = useCallback((descriptor: SortDescriptor) => {
		setSortDescriptor(descriptor);
	}, []);
	const onSelectionChange = useMemoizedCallback((keys: Selection) => {
		setSelectedKeys(keys);
	});

	const filtered = useMemo(
		() =>
			users.filter((user) =>
				(user.username ?? '').toLowerCase().includes(filterValue.toLowerCase()),
			),
		[users, filterValue],
	);
	const sorted = useMemo(() => {
		const { column, direction } = sortDescriptor;
		return [...filtered].sort((a, b) => {
			let cmp = 0;
			if (column === 'role') {
				cmp = a.role.localeCompare(b.role);
			} else if (
				column === 'username' ||
				column === 'email' ||
				column === 'id'
			) {
				cmp = String(a[column]).localeCompare(String(b[column]));
			}
			return direction === 'ascending' ? cmp : -cmp;
		});
	}, [filtered, sortDescriptor]);
	const totalPages = Math.max(Math.ceil(sorted.length / rowsPerPage), 1);
	const displayed = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		return sorted.slice(start, start + rowsPerPage);
	}, [sorted, page, rowsPerPage]);

	const headerColumns = useMemo(() => {
		const base =
			// @ts-ignore
			Array.from(visibleColumns) === 'all'
				? USER_COLUMNS
				: USER_COLUMNS.filter((c) =>
						(visibleColumns as Set<string>).has(c.uid),
					);
		return base.map((c) => ({
			...c,
			sortDirection:
				sortDescriptor.column === c.uid ? sortDescriptor.direction : undefined,
		}));
	}, [visibleColumns, sortDescriptor]);

	const { isOpen, onClose, onOpenChange } = useDisclosure();

	// topContent: input de búsqueda y dropdown para columnas
	const topContent = useMemo(
		() => (
			<div className="flex flex-col gap-4">
				<div className="flex items-end justify-between gap-3">
					<Input
						isClearable
						classNames={{
							base: cn(isSmall ? 'w-full max-w-xs' : 'w-full sm:max-w-[44%]'),
							inputWrapper: 'border-1',
						}}
						placeholder="Search by Username..."
						size="sm"
						startContent={<SearchIcon className="text-default-300" />}
						value={filterValue}
						variant="bordered"
						onClear={onClear}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-x-4">
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button
									endContent={<ChevronDownIcon className="text-small" />}
									size="sm"
									variant="flat"
									color="primary"
								>
									Columns
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={visibleColumns}
								selectionMode="multiple"
								onSelectionChange={setVisibleColumns}
							>
								{USER_COLUMNS.map((col) => (
									<DropdownItem key={col.uid} className="capitalize">
										{capitalize(col.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Button
							size="sm"
							variant="flat"
							color="primary"
							className="hidden sm:flex"
							onPress={onOpenChange}
						>
							Add User
						</Button>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-default-600 text-small">
						Total {users.length} users
					</span>
					<label className="flex items-center text-default-600 text-small">
						Rows per page:
						<select
							className="bg-transparent outline-none text-default-600 text-small"
							onChange={onRowsPerPageChange}
							value={rowsPerPage}
						>
							{[5, 10, 15].map((n) => (
								<option key={n} value={n}>
									{n}
								</option>
							))}
						</select>
					</label>
				</div>
			</div>
		),
		[
			filterValue,
			isSmall,
			visibleColumns,
			onSearchChange,
			onOpenChange,
			onRowsPerPageChange,
			users.length,
			rowsPerPage,
			onClear,
		],
	);

	const bottomContent = useMemo(
		() => (
			<div className="flex items-center justify-between px-2 py-2">
				<span className="text-small text-default-600">
					{selectedKeys === 'all'
						? 'All items selected'
						: `${(selectedKeys as Set<string>).size} of ${filtered.length} selected`}
				</span>
				<Pagination
					isCompact
					showControls
					showShadow
					color="primary"
					classNames={{
						cursor: 'text-white',
					}}
					page={page}
					total={totalPages}
					onChange={setPage}
				/>
				<div className="hidden gap-2 sm:flex">
					<Button
						size="sm"
						variant="flat"
						onPress={onPreviousPage}
						color="primary"
						isDisabled={page === 1}
					>
						Previous
					</Button>
					<Button
						size="sm"
						variant="flat"
						onPress={onNextPage}
						color="primary"
						isDisabled={page === totalPages}
					>
						Next
					</Button>
				</div>
			</div>
		),
		[
			selectedKeys,
			filtered.length,
			page,
			totalPages,
			onNextPage,
			onPreviousPage,
		],
	);

	return (
		<div className="w-full p-6">
			<ModalUser
				isOpen={isOpen}
				onClose={onClose}
				onOpenChange={onOpenChange}
			/>
			<Table
				isHeaderSticky
				aria-label="Users table"
				topContent={topContent}
				topContentPlacement="outside"
				bottomContent={bottomContent}
				bottomContentPlacement="outside"
				selectedKeys={selectedKeys}
				selectionMode="multiple"
				sortDescriptor={sortDescriptor}
				onSelectionChange={onSelectionChange}
				onSortChange={onSortChange}
				classNames={{
					base: cn(isSmall ? 'w-full' : 'w-full lg:min-w-[1100px]'),
				}}
			>
				<TableHeader columns={headerColumns}>
					{(col) => (
						<TableColumn
							key={col.uid}
							allowsSorting={col.sortable}
							align="start"
						>
							{col.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={displayed} emptyContent="No users found">
					{(user) => (
						<TableRow key={user.id}>
							{headerColumns.map((col) => (
								<TableCell key={col.uid}>
									{(() => {
										switch (col.uid) {
											case 'username':
												return (
													<NUser
														avatarProps={{
															src: `https://unavatar.io/${user.firstName}`,
														}}
														name={`${user.firstName} ${user.lastName}`}
														description={user.username}
													/>
												);
											case 'email':
												return user.email;
											case 'role':
												switch (user.role) {
													case 'ADMIN':
														return (
															<Chip color="success" variant="flat" size="sm">
																Admin
															</Chip>
														);
													case 'USER':
														return (
															<Chip color="primary" variant="flat" size="sm">
																User
															</Chip>
														);
													default:
														return 'Unknown';
												}
											case 'active':
												return user.active ? (
													<Chip color="success" variant="flat" size="sm">
														Active
													</Chip>
												) : (
													<Chip color="danger" variant="flat" size="sm">
														Inactive
													</Chip>
												);
											default:
												return null;
										}
									})()}
								</TableCell>
							))}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
