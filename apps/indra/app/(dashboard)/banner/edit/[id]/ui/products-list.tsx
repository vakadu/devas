'use client';

import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { Routes } from '../../../../../../core/primitives';
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
import { useGetProductsByIds } from '../../../../../../core/api';

export default function ProductsList({
	imageDetails,
	id,
}: {
	imageDetails: ICatalougeTypes.IBannerImage;
	id: string;
}) {
	const { data } = useGetProductsByIds(imageDetails.productIds.join(','));

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => <div>{row.getValue('title')}</div>,
			},
			{
				accessorKey: 'category',
				header: 'Category',
				cell: ({ row }) => <div>{row.getValue('category')}</div>,
			},
			{
				accessorKey: 'subcategory',
				header: 'Sub Category',
				cell: ({ row }) => <div>{row.getValue('subcategory')}</div>,
			},
			{
				accessorKey: 'brand',
				header: 'Brand',
				cell: ({ row }) => <div>{row.getValue('brand')}</div>,
			},
		],
		[]
	);

	const table = useReactTable({
		data: data?.data?.products as ICatalougeTypes.IProduct[],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	if (!data || imageDetails.productIds.length <= 0) {
		return (
			<div className="flex flex-col gap-12 justify-center items-center p-16">
				<span className="text-14">No Products Found.</span>
				<Link href={`${Routes.EditBanner}/${id}/${imageDetails._id}`}>
					<Button size="lg">
						<PlusIcon className="!size-16" />
						<span className="text-14 font-medium">Add More Products</span>
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-12">
			<div className="p-12 border-b border-grey-light flex justify-between items-center">
				<span className="text-14 font-medium">Products</span>
				<Link href={`${Routes.EditBanner}/${id}/${imageDetails._id}`}>
					<Button size="lg">
						<PlusIcon className="!size-16" />
						<span className="text-14 font-medium">Add More Products</span>
					</Button>
				</Link>
			</div>
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
					{table?.getRowModel()?.rows.length > 0 &&
						table?.getRowModel().rows.map((row) => {
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
						})}
				</TableBody>
			</Table>
		</div>
	);
}
