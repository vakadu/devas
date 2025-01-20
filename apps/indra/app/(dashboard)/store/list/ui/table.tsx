import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { StoreListingTable } from '../../../../../core/ui';
import { Routes } from '../../../../../core/primitives';

export default function ColumnsListing() {
	const params = useParams();

	const columns: ColumnDef<ICatalougeTypes.IStore>[] = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Store Name',
				cell: ({ row }) => {
					return (
						<Link
							className="hover:underline hover:text-primary"
							href={`${Routes.StoreDetails}/${row.original.userId}?type=details`}
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
			// {
			// 	accessorKey: '',
			// 	header: 'Actions',
			// 	cell: ({ row }) => {
			// 		const handleEvents = async (link: string) => {
			// 			await trackEvent('ADD_STORE_PRODUCT', {
			// 				path: link,
			// 			});
			// 		};

			// 		return (
			// 			<div className="flex gap-12">
			// 				<Link
			// 					className="inline-flex items-center bg-secondary hover:bg-secondary-foreground px-12 py-8 rounded-12 gap-6"
			// 					href={`${Routes.AddStoreProduct}/${row.original.userId}?type=product`}
			// 					onClick={() =>
			// 						handleEvents(
			// 							`${Routes.AddStoreProduct}/${row.original.userId}?type=product`
			// 						)
			// 					}
			// 				>
			// 					<PlusIcon className="size-16 text-white" />
			// 					<span className="text-12  font-semibold text-white">
			// 						Add Product
			// 					</span>
			// 				</Link>
			// 				<Link
			// 					className="inline-flex items-center bg-secondary hover:bg-secondary-foreground px-12 py-8 rounded-12 gap-6"
			// 					href={`${Routes.StoreProductList}/${row.original.userId}`}
			// 					onClick={() =>
			// 						handleEvents(
			// 							`${Routes.StoreProductList}/${row.original.userId}`
			// 						)
			// 					}
			// 				>
			// 					<ListOrdered className="size-16 text-white" />
			// 					<span className="text-12  font-semibold text-white">
			// 						Product List
			// 					</span>
			// 				</Link>
			// 			</div>
			// 		);
			// 	},
			// },
		],
		[]
	);

	return <StoreListingTable columns={columns} id={params?.id as string} />;
}
