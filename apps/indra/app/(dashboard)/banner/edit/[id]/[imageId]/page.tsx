'use client';

import {
	ProductListing,
	ProductListingContent,
	ProductListingHeader,
} from '../../../../../../core/ui';
import ColumnsListing from './ui/columns-listing';
import ProductActions from './ui/product-actions';

export default function Page() {
	return (
		<ProductListing
			className="m-16 shadow-card1 bg-white rounded-8"
			showInactive={1}
			apiKey="products/banners"
		>
			<ProductActions />
			<ProductListingHeader />
			<ProductListingContent>
				<ColumnsListing />
			</ProductListingContent>
		</ProductListing>
	);
}
