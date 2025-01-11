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
import Link from 'next/link';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@devas/ui';
import { Routes } from '../../../../../core/primitives';
import { cn } from '@devas/utils';
import { useAnalytics } from '../../../../../core/context';

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

					const handleEvents = async () => {
						await trackEvent('EDIT_CATALOUGE_PRODUCT', {
							path: `${Routes.EditProduct}/${id}?type=product`,
							productId: id,
						});
					};

					return (
						<Link
							className="hover:underline hover:text-primary"
							href={`${Routes.EditProduct}/${id}?type=product`}
							onClick={handleEvents}
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
		<Table className="bg-white relative">
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
