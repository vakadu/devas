'use client';

import { useParams } from 'next/navigation';
import {
	StoreProductsListing,
	StoreProductsListingContent,
	StoreProductsListingHeader,
} from '../../../../../../core/ui';
import ColumnsListing from './ui/table';

export default function Page() {
	const params = useParams();

	return (
		<div className="w-full p-16 h-full">
			<div className="h-full">
				<StoreProductsListing
					apiKey="store/products/list"
					showInactive={1}
					storeId={params?.id as string}
				>
					<StoreProductsListingHeader />
					<StoreProductsListingContent>
						<ColumnsListing />
					</StoreProductsListingContent>
				</StoreProductsListing>
			</div>
		</div>
	);
}
