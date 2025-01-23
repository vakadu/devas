'use client';

import { useAppSelector } from '../../../core/store';
import {
	StoreProductsListing,
	StoreProductsListingContent,
	StoreProductsListingHeader,
} from '../../../core/ui';
import StoreProductsListTable from './ui/table';

export default function Page() {
	const auth = useAppSelector((state) => state.auth);

	return (
		<div className="w-full p-16 h-full">
			<div className="h-full">
				<StoreProductsListing
					showInactive={1}
					apiKey="store/products/list"
					storeId={auth.userId as string}
					className="shadow-card1 rounded-8 bg-white"
				>
					<StoreProductsListingHeader storeId={auth.userId as string} />
					<StoreProductsListingContent>
						<StoreProductsListTable />
					</StoreProductsListingContent>
				</StoreProductsListing>
			</div>
		</div>
	);
}
