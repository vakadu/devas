'use client';

import { ListingContent, ListingHeader, StoreListing } from '../../../../core/ui';
import StoreListTable from './ui/table';

export default function Page() {
	return (
		<div className="w-full p-16 h-full">
			<div className="h-full">
				<StoreListing>
					<ListingHeader type="store" />
					<ListingContent>
						<StoreListTable />
					</ListingContent>
				</StoreListing>
			</div>
		</div>
	);
}
