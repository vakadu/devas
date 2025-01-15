'use client';

import { ProductListing, ProductListingHeader, ProductListingContent } from '../../../../core/ui';
import ColumnsListing from './ui/table';

export default function Page() {
	return (
		<div className="w-full p-16 h-full">
			<div className="h-full">
				<ProductListing showInactive={0} apiKey="products/list">
					<ProductListingHeader />
					<ProductListingContent>
						<ColumnsListing />
					</ProductListingContent>
				</ProductListing>
			</div>
		</div>
	);
}
