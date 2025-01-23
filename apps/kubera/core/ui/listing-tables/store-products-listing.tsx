'use client';

import {
	VisibilityState,
	flexRender,
	getCoreRowModel,
	useReactTable,
	ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';

import {
	Button,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@devas/ui';
import { useStoreProductsListingContext } from '../listing/context';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function StoreProductsListingTable({
	columns,
	id,
}: {
	columns: ColumnDef<ICatalougeTypes.IStoreProducts>[];
	id: string;
}) {
	const { data, isFetching, rowSelection, setRowSelection, pagination, setPagination } =
		useStoreProductsListingContext();
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const table = useReactTable({
		data: data as ICatalougeTypes.IStoreProducts[],
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: (newRowSelection: any) => setRowSelection(newRowSelection),
		// getRowId: (row) => row._id,
		state: {
			columnVisibility,
			rowSelection,
			pagination,
		},
		onPaginationChange: () => setPagination(pagination),
		manualPagination: true,
	});

	return (
		<div>
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
							return (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
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
			<div className="flex justify-end items-center gap-12 p-16 border-t">
				<Button
					disabled={pagination.pageIndex === 0}
					onClick={() =>
						setPagination({
							...pagination,
							pageIndex: pagination.pageIndex - 1,
						})
					}
					size="lg"
				>
					<ChevronLeft />
					<span className="text-14 font-medium">Previous</span>
				</Button>
				<Button
					disabled={data.length < pagination.pageSize}
					onClick={() =>
						setPagination({
							...pagination,
							pageIndex: pagination.pageIndex + 1,
						})
					}
					size="lg"
					className="py-12"
				>
					<span className="text-14 font-medium">Next</span>
					<ChevronRight />
				</Button>
			</div>
		</div>
	);
}
