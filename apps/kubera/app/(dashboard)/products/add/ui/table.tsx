import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useAnalytics } from '../../../../../core/context';
import { ProductListingTable } from '../../../../../core/ui';

export default function StoreProductsListTable({
	handleChange,
}: {
	handleChange: (val: string, id: string) => void;
}) {
	const { trackEvent } = useAnalytics();
	const params = useParams();

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => {
					return (
						<div
							onClick={() => handleChange('details', row.original.productId)}
							className="cursor-pointer hover:underline hover:text-primary w-[340px] line-clamp-2"
						>
							{row.original.title}
						</div>
					);
				},
			},
			{
				accessorKey: 'Mrp',
				header: 'mrp',
				cell: ({ row }) => {
					return <div className="">&#8377;{row.original.price}</div>;
				},
			},
			{
				accessorKey: 'category',
				header: 'Category',
				cell: ({ row }) => {
					const cat = row.original.category;
					return <div>{cat}</div>;
				},
			},
		],
		[trackEvent]
	);

	return <ProductListingTable type="store-listing" columns={columns} id={params?.id as string} />;
}
