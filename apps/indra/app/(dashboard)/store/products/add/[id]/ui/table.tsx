import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { ProductListingTable } from '../../../../../../../core/ui';

export default function ColumsListing({
	handleChange,
}: {
	handleChange: (val: string, id: string) => void;
}) {
	const params = useParams();

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => {
					const handleTab = async () => {
						handleChange('details', row.original.productId);
					};

					return (
						<div
							className="cursor-pointer hover:underline hover:text-primary w-[340px] line-clamp-2"
							onClick={handleTab}
						>
							{row.original.title}
						</div>
					);
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
		[handleChange]
	);

	return <ProductListingTable type="store-listing" columns={columns} id={params?.id as string} />;
}
