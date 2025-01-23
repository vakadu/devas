import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	PaginationState,
	useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
import { Routes } from '../../../../../core/primitives';

export default function ListingTable({
	data,
	isLoading,
	pagination,
	setPagination,
}: {
	data: ICatalougeTypes.IBanner[];
	isLoading: boolean;
	pagination: PaginationState;
	setPagination: (state: PaginationState) => void;
}) {
	const columns: ColumnDef<ICatalougeTypes.IBanner>[] = useMemo(
		() => [
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => {
					return (
						<Link
							className="hover:underline hover:text-primary"
							href={`${Routes.EditBanner}/${row.original._id}?type=details`}
						>
							{row.getValue('title')}
						</Link>
					);
				},
			},
			{
				accessorKey: 'description',
				header: 'Description',
				cell: ({ row }) => <div>{row.getValue('description')}</div>,
			},
			{
				accessorKey: 'type',
				header: 'Type',
				cell: ({ row }) => <div>{row.getValue('type')}</div>,
			},
		],
		[]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			pagination,
		},
		onPaginationChange: () => setPagination(pagination),
		manualPagination: true,
	});

	if (isLoading) {
		return (
			<div className="my-54">
				<Spinner />
			</div>
		);
	}

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
					{table?.getRowModel()?.rows?.length ? (
						table?.getRowModel()?.rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell className="px-16 text-14" key={cell.id}>
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
			<div className="flex justify-end items-center gap-12 border-t p-16">
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
