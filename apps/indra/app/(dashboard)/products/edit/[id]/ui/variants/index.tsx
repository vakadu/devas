'use client';

import { ListingHeader, ProductListing, ListingContent } from '../../../../../../../core/ui';
import VariantProductTable from './table';

export default function Varaints() {
	return (
		<ProductListing>
			<ListingHeader />
			<ListingContent>
				<VariantProductTable />
			</ListingContent>
		</ProductListing>
	);
}
