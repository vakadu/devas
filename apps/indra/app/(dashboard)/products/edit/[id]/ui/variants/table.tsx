import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { cn } from '@devas/utils';
import { ProductListingTable } from '../../../../../../../core/ui';
import { Button, Checkbox } from '@devas/ui';
import { useProductListingContext } from '../../../../../../../core/ui/product-listing/context';

export default function VariantProductTable() {
	// const { trackEvent } = useAnalytics();
	const params = useParams();
	const { rowSelection } = useProductListingContext();
	const selectedRows = Object.keys(rowSelection);
	console.log(selectedRows);

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
			{
				id: 'select',
				header: () => (
					<Button disabled={selectedRows.length <= 0} size="sm">
						Add Varaints
					</Button>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label="Select row"
					/>
				),
			},
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
		[selectedRows.length]
	);

	return <ProductListingTable columns={columns} type="variant" id={params?.id as string} />;
}
