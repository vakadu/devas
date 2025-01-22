'use client';

import { useParams } from 'next/navigation';

import {
	StoreProductsListing,
	StoreProductsListingContent,
	StoreProductsListingHeader,
} from '../../../../../../core/ui';
import ColumnsListing from './table';

export default function Listing() {
	const params = useParams();

	return (
		<div className="w-full h-full">
			<div className="h-full">
				<StoreProductsListing
					apiKey="store/products/list"
					showInactive={1}
					storeId={params?.id as string}
					className="shadow-card1 rounded-8 bg-white"
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
