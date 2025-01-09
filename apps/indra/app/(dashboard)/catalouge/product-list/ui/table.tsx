import {
	ColumnDef,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@devas/ui';
import Link from 'next/link';
import { Routes } from '../../../../../core/primitives';
import { cn } from '@devas/utils';
import { MoreVerticalIcon } from 'lucide-react';
import { useAnalytics } from '../../../../../core/context';

const dropDownData = [
	{ type: 'product', title: 'Edit Product Details' },
	{ type: 'images', title: 'Edit Images' },
	{ type: 'attributes', title: 'Edit Attributes' },
	{ type: 'variants', title: 'Edit Variants' },
];

export default function ListingTable({ data }: { data: ICatalougeTypes.IProduct[] }) {
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const { trackEvent } = useAnalytics();

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
			{
				accessorKey: 'productId',
				header: 'Product Id',
				cell: ({ row }) => {
					const id = parseInt(row.getValue('productId'));
					return (
						<Link
							className="hover:underline hover:text-primary"
							href={`${Routes.CatalougeEditProduct}/${id}?type=product`}
						>
							{id}
						</Link>
					);
				},
			},
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => <div>{row.getValue('title')}</div>,
			},
			{
				accessorKey: 'gstInPercent',
				header: 'GST',
				cell: ({ row }) => <div>{row.getValue('gstInPercent')}</div>,
			},
			{
				accessorKey: 'active',
				header: 'Status',
				cell: ({ row }) => {
					const status = row.getValue('active');
					return (
						<div
							className={cn(
								'rounded-full inline-block py-4 !font-semibold px-12 !text-12',
								status ? 'bg-primary text-white' : 'bg-red-1 text-white'
							)}
						>
							{status ? 'Active' : 'Inactive'}
						</div>
					);
				},
			},
			{
				id: 'actions',
				header: 'Actions',
				cell: ({ row }) => {
					const id = row.getValue('productId');

					const handleEvents = async (item: { type: string; title: string }) => {
						await trackEvent('EDIT_CATALOUGE_PRODUCT', {
							path: `${Routes.CatalougeEditProduct}/${id}?type=${item.type}`,
							title: item.title,
						});
					};

					return (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<MoreVerticalIcon className="size-18" />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{dropDownData.map((menu) => (
									<DropdownMenuItem key={menu.type}>
										<Link
											href={`${Routes.CatalougeEditProduct}/${id}?type=${menu.type}`}
											onClick={() => handleEvents(menu)}
										>
											{menu.title}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
			},
		],
		[trackEvent]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<Table className="bg-white">
			<TableHeader>
				{table?.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead className="text-16 p-16" key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
									  )}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table?.getRowModel()?.rows?.length ? (
					table?.getRowModel()?.rows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell className="px-16" key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className="h-24 text-center py-24">
							<span>No results found.</span>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
