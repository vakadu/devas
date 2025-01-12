'use client';

import { ListingContent, ListingHeader, ProductListing } from '../../../../core/ui';
import ProductListTable from './ui/table';

export default function Page() {
	return (
		<div className="w-full p-16 h-full">
			<div className="h-full">
				<ProductListing>
					<ListingHeader />
					<ListingContent>
						<ProductListTable />
					</ListingContent>
				</ProductListing>
			</div>
		</div>
	);
}
