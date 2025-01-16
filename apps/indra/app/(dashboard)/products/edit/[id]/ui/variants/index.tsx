'use client';

import {
	ProductListing,
	ProductListingHeader,
	ProductListingContent,
} from '../../../../../../../core/ui';
import ColumnsListing from './columns-listing';

export default function Varaints() {
	return (
		<ProductListing showInactive={1} apiKey="products/varaints">
			<ProductListingHeader />
			<ProductListingContent>
				{/* <SelectedVariants /> */}
				<ColumnsListing />
			</ProductListingContent>
		</ProductListing>
	);
}
