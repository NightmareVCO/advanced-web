'use client';
import { useState, useMemo, useCallback } from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Pagination,
	Chip,
	User,
	type Selection,
	type SortDescriptor,
} from '@heroui/react';
import { ChevronDownIcon, SearchIcon } from '@heroui/shared-icons';
import { useMemoizedCallback } from './useMemoizedCallback';
import type { Order } from '@lib/fetch/orders.fetch';
import OrderItemsModal from '@components/modal/ModalOrderItems';

export const ORDER_COLUMNS = [
	{ uid: 'id', name: 'Order ID', sortable: true },
	{ uid: 'items', name: 'Books Count', sortable: false },
	{ uid: 'totalPrice', name: 'Total Price', sortable: true },
	{ uid: 'createDate', name: 'Create Date', sortable: true },
	{ uid: 'actions', name: 'Actions', sortable: false },
];

const statusOptions = [
	{ name: 'All', uid: 'all' },
	{ name: 'Recent', uid: 'recent' },
	{ name: 'Old', uid: 'old' },
] as const;

type OrdersTableProps = { orders: Order[] };

export function capitalize(s: string | undefined) {
	return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
}

function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		month: '2-digit',
		day: '2-digit',
		year: 'numeric',
	});
}

export default function OrdersTable({ orders }: OrdersTableProps) {
	const [filterValue, setFilterValue] = useState('');
	const [statusFilter, setStatusFilter] = useState<Selection>('all');
	const [visibleColumns, setVisibleColumns] = useState<Selection>(
		new Set(ORDER_COLUMNS.map((c) => c.uid)),
	);
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: 'id',
		direction: 'ascending',
	});
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

	const hasSearchFilter = Boolean(filterValue);

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

	// Data transformations
	const filtered = useMemo(
		() =>
			orders.filter((o) =>
				o.id.toLowerCase().includes(filterValue.toLowerCase()),
			),
		[orders, filterValue],
	);
	const sorted = useMemo(() => {
		const { column, direction } = sortDescriptor;
		return [...filtered].sort((a, b) => {
			let cmp = 0;
			if (column === 'totalPrice') {
				cmp = a.totalPrice - b.totalPrice;
			} else if (column === 'id' || column === 'createDate') {
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
			Array.from(visibleColumns) === 'all'
				? ORDER_COLUMNS
				: ORDER_COLUMNS.filter((c) =>
						(visibleColumns as Set<string>).has(c.uid),
					);
		return base.map((c) => ({
			...c,
			sortDirection:
				sortDescriptor.column === c.uid ? sortDescriptor.direction : undefined,
		}));
	}, [visibleColumns, sortDescriptor]);

	// topContent
	const topContent = useMemo(
		() => (
			<div className="flex flex-col gap-4">
				<div className="flex items-end justify-between gap-3">
					<Input
						isClearable
						classNames={{
							base: 'w-full sm:max-w-[44%]',
							inputWrapper: 'border-1',
						}}
						placeholder="Search by Order ID..."
						size="sm"
						startContent={<SearchIcon className="text-default-300" />}
						value={filterValue}
						variant="bordered"
						onClear={onClear}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button
									endContent={<ChevronDownIcon className="text-small" />}
									size="sm"
									variant="flat"
									color="primary"
								>
									Status
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Filter Status"
								closeOnSelect={false}
								selectedKeys={statusFilter}
								selectionMode="multiple"
								onSelectionChange={setStatusFilter}
							>
								{statusOptions.map((s) => (
									<DropdownItem key={s.uid} className="capitalize">
										{capitalize(s.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>

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
								{ORDER_COLUMNS.map((col) => (
									<DropdownItem key={col.uid} className="capitalize">
										{capitalize(col.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-default-600 text-small">
						Total {orders.length} orders
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
			statusFilter,
			visibleColumns,
			onSearchChange,
			onRowsPerPageChange,
			orders.length,
			rowsPerPage,
			onClear,
		],
	);

	// bottomContent
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
			<Table
				isHeaderSticky
				aria-label="Orders table"
				bottomContent={bottomContent}
				bottomContentPlacement="outside"
				topContent={topContent}
				topContentPlacement="outside"
				selectedKeys={selectedKeys}
				selectionMode="multiple"
				sortDescriptor={sortDescriptor}
				onSelectionChange={onSelectionChange}
				onSortChange={onSortChange}
				classNames={{
					base: 'w-full lg:min-w-[1100px]',
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
				<TableBody items={displayed} emptyContent="No orders found">
					{(order) => (
						<TableRow key={order.id}>
							{headerColumns.map((col) => (
								<TableCell key={col.uid}>
									{(() => {
										switch (col.uid) {
											case 'id':
												return order.id;
											case 'items':
												return order.items.length;
											case 'totalPrice':
												return `$${order.totalPrice.toFixed(2)}`;
											case 'createDate':
												return formatDate(order.createDate);
											case 'actions':
												return <OrderItemsModal products={order.items} />;
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
