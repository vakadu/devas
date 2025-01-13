import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@devas/utils';
import { StoreListingTable } from '../../../../../core/ui';
import { Routes } from '../../../../../core/primitives';
import { useAnalytics } from '../../../../../core/context';

export default function StoreListTable() {
	const { trackEvent } = useAnalytics();
	const params = useParams();

	const columns: ColumnDef<ICatalougeTypes.IStore>[] = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Store Name',
				cell: ({ row }) => {
					// const handleEvents = async () => {
					// 	await trackEvent('EDIT_CATALOUGE_PRODUCT', {
					// 		path: `${Routes.EditProduct}/${row.original.productId}?type=product`,
					// 		productId: row.original.productId,
					// 	});
					// };

					return (
						<Link
							className="hover:underline hover:text-primary"
							href="/"
							// href={`${Routes.EditProduct}/${row.original.productId}?type=product`}
							// onClick={handleEvents}
						>
							{row.original.name}
						</Link>
					);
				},
			},
			{
				accessorKey: 'mobile',
				header: 'Mobile',
				cell: ({ row }) => <div>{row.getValue('mobile')}</div>,
			},
			{
				accessorKey: '',
				header: 'Actions',
				cell: ({ row }) => {
					const handleEvents = async () => {
						await trackEvent('ADD_STORE_PRODUCT', {
							path: `${Routes.AddStoreProduct}`,
						});
					};

					return (
						<Link
							className="hover:underline hover:text-primary"
							href={`${Routes.AddStoreProduct}/${row.original.userId}`}
							onClick={handleEvents}
						>
							Add Product
						</Link>
					);
				},
			},
		],
		[trackEvent]
	);

	return <StoreListingTable columns={columns} id={params?.id as string} />;
}
