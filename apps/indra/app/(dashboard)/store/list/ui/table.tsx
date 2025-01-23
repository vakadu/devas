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
		],
		[]
	);

	return <StoreListingTable columns={columns} id={params?.id as string} />;
}
