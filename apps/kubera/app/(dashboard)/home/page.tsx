'use client';

import { useAppSelector } from '../../../core/store';
import { ListingContent, ListingHeader, StoreProductsListing } from '../../../core/ui';
import StoreProductsListTable from './ui/table';

export default function Page() {
	const auth = useAppSelector((state) => state.auth);

	return (
		<div className="w-full p-16 h-full">
			<div className="h-full">
				<StoreProductsListing storeId={auth.userId as string}>
					<ListingHeader type="store" />
					<ListingContent>
						<StoreProductsListTable />
					</ListingContent>
				</StoreProductsListing>
			</div>
		</div>
	);
}
