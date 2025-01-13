'use client';

import { useParams } from 'next/navigation';
import { ListingContent, ListingHeader, StoreProductsListing } from '../../../../../../core/ui';
import StoreListTable from './ui/table';

export default function Page() {
	const params = useParams();

	return (
		<div className="w-full p-16 h-full">
			<div className="h-full">
				<StoreProductsListing storeId={params?.id as string}>
					<ListingHeader type="store" />
					<ListingContent>
						<StoreListTable />
					</ListingContent>
				</StoreProductsListing>
			</div>
		</div>
	);
}
