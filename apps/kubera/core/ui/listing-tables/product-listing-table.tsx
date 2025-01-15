'use client';

import {
	VisibilityState,
	flexRender,
	getCoreRowModel,
	useReactTable,
	ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@devas/ui';
import { cn } from '@devas/utils';
import { useProductListingContext } from '../listing/context';

export function ProductListingTable({
	columns,
	type,
	id,
}: {
	columns: ColumnDef<ICatalougeTypes.IProduct>[];
	type: string;
	id?: string;
}) {
	const { data, isFetching, rowSelection, setRowSelection } = useProductListingContext();
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const table = useReactTable({
		data: data as ICatalougeTypes.IProduct[],
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: (newRowSelection: any) => setRowSelection(newRowSelection),
		getRowId: (row) => row.productId,
		state: {
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<Table className="relative">
			<TableHeader>
				{table?.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead className="text-14 p-16" key={header.id}>
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
				{isFetching ? (
					<TableRow>
						<TableCell colSpan={columns.length} className="text-center">
							<Spinner />
							<span>Fetching new results...</span>
						</TableCell>
					</TableRow>
				) : table?.getRowModel()?.rows.length ? (
					table.getRowModel().rows.map((row) => {
						let rowDisable = false;
						if (type === 'variant') {
							rowDisable = row.original.productId === id;
						}
						return (
							<TableRow
								className={cn(
									rowDisable && 'pointer-events-none bg-grey-2 opacity-20'
								)}
								key={row.id}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						);
					})
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className="text-center">
							No results found.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
