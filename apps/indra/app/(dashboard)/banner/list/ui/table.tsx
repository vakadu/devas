import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@devas/ui';
import { useAnalytics } from '../../../../../core/context';
import Link from 'next/link';
import { Routes } from '../../../../../core/primitives';

export default function ListingTable({
	data,
	isLoading,
}: {
	data: ICatalougeTypes.IBanner[];
	isLoading: boolean;
}) {
	const { trackEvent } = useAnalytics();

	const columns: ColumnDef<ICatalougeTypes.IBanner>[] = useMemo(
		() => [
			{
				accessorKey: '_id',
				header: 'id',
				cell: ({ row }) => {
					return <div>{row.getValue('_id')}</div>;
				},
				enableHiding: true,
			},
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => {
					const id = row.getValue('_id');

					const handleLink = async () => {
						await trackEvent('EDIT_BANNER', {
							id,
						});
					};

					return (
						<Link
							className="hover:underline hover:text-primary"
							onClick={handleLink}
							href={`${Routes.EditBanner}/${id}`}
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
		[trackEvent]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			columnVisibility: {
				_id: false,
			},
		},
	});

	if (isLoading) {
		return (
			<div className="my-54">
				<Spinner />
			</div>
		);
	}

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
