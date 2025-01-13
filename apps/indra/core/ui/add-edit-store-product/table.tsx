import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@devas/utils';
import { ProductListingTable } from '../product-listing-table';
import { Routes } from '../../primitives';
import { useAnalytics } from '../../context';
import { Checkbox } from '@devas/ui';

export default function ProductListTable({
	setRowSelection,
}: {
	setRowSelection: (state: RowSelectionState) => void;
}) {
	const { trackEvent } = useAnalytics();
	const params = useParams();

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
			{
				id: 'select',
				header: '',
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => {
							if (value) {
								setRowSelection({ [row.original.productId]: true });
							} else {
								setRowSelection({});
							}
						}}
						aria-label="Select row"
					/>
				),
			},
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => {
					const handleEvents = async () => {
						await trackEvent('EDIT_CATALOUGE_PRODUCT', {
							path: `${Routes.EditProduct}/${row.original.productId}?type=product`,
							productId: row.original.productId,
						});
					};

					return (
						<Link
							className="hover:underline hover:text-primary"
							href={`${Routes.EditProduct}/${row.original.productId}?type=product`}
							onClick={handleEvents}
						>
							{row.original.title}
						</Link>
					);
				},
			},
			{
				accessorKey: 'category',
				header: 'Category',
				cell: ({ row }) => <div>{row.getValue('category')}</div>,
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
