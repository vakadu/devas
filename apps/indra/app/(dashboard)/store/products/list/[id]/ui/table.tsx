import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { PenIcon } from 'lucide-react';
import { useAnalytics } from '../../../../../../../core/context';
import { Routes } from '../../../../../../../core/primitives';
import { StoreProductsListingTable } from '../../../../../../../core/ui/listing-tables/store-products-listing';
import { cn } from '@devas/utils';

export default function StoreProductsListTable() {
	const { trackEvent } = useAnalytics();
	const params = useParams();

	const columns: ColumnDef<ICatalougeTypes.IStoreProducts>[] = useMemo(
		() => [
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => {
					const handleEvents = async () => {
						await trackEvent('EDIT_CATALOUGE_PRODUCT', {
							path: `${Routes.EditProduct}/${row.original.product.productId}?type=product`,
							productId: row.original.product.productId,
						});
					};

					return (
						<Link
							className="hover:underline hover:text-primary"
							href={`${Routes.EditProduct}/${row.original.product.productId}?type=product`}
							onClick={handleEvents}
						>
							{row.original.product.title}
						</Link>
					);
				},
			},
			{
				accessorKey: 'category',
				header: 'Category',
				cell: ({ row }) => {
					const cat = row.original.product.category;
					return <div>{cat}</div>;
				},
			},
			{
				accessorKey: 'price',
				header: 'Price',
				cell: ({ row }) => {
					const price = row.original.price;
					return <div className="font-bold text-14">&#8377;{price}</div>;
				},
			},
			{
				accessorKey: 'quantity',
				header: 'Quantity',
				cell: ({ row }) => {
					const quantity = row.original.quantity;
					return <div className="font-bold text-14">{quantity}</div>;
				},
			},
			{
				accessorKey: 'discount',
				header: 'Discount',
				cell: ({ row }) => {
					const discount = row.original.discount;
					return <div>{discount}</div>;
				},
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
				accessorKey: 'status',
				header: 'Product Status',
				cell: ({ row }) => {
					const status = row.original.status;
					return (
						<div
							className={cn(
								'rounded-full inline-block py-4 !font-semibold px-12 !text-12',
								status === 'ADDED' && 'bg-orange text-white',
								status === 'APPROVED' && 'bg-primary text-white',
								status === 'HOLD' && 'bg-red-1 text-white'
							)}
						>
							{status}
						</div>
					);
				},
			},
			{
				accessorKey: '',
				header: 'Actions',
				cell: ({ row }) => {
					const handleEvents = async (link: string) => {
						await trackEvent('UPDATE_STORE_PRODUCT', {
							path: link,
						});
					};

					return (
						<div className="flex gap-12">
							<Link
								className="inline-flex items-center bg-secondary hover:bg-secondary-foreground px-12 py-8 rounded-12 gap-6"
								href={`${Routes.EditStoreProduct}/${row.original.storeId}/${row.original.product.productId}?storeProductId=${row.original.storeProductId}`}
								onClick={() =>
									handleEvents(
										`${Routes.EditStoreProduct}/${row.original.storeId}/${row.original.product.productId}?storeProductId=${row.original.storeProductId}`
									)
								}
							>
								<PenIcon className="size-16 text-white" />
								<span className="text-12  font-semibold text-white">
									Update Product
								</span>
							</Link>
						</div>
					);
				},
			},
		],
		[trackEvent]
	);

	return <StoreProductsListingTable columns={columns} id={params?.id as string} />;
}
