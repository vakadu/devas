import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@devas/utils';
import { ProductListingTable } from '../../../../../core/ui';
import { Routes } from '../../../../../core/primitives';
import { Tooltip, TooltipContent, TooltipTrigger } from '@devas/ui';

export default function ColumnsListing() {
	const params = useParams();

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => {
					return (
						<Tooltip>
							<TooltipTrigger>
								<Link
									className="hover:underline hover:text-primary w-[340px] line-clamp-2 text-16 text-left"
									href={`${Routes.EditProduct}/${row.original.productId}?type=product`}
								>
									{row.original.title}
								</Link>
							</TooltipTrigger>
							<TooltipContent className="bg-white border border-grey-light rounded-8">
								<p className="text-black-1 text-14">{row.original.title}</p>
							</TooltipContent>
						</Tooltip>
					);
				},
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
		[]
	);

	return <ProductListingTable columns={columns} type="product-list" id={params?.id as string} />;
}
