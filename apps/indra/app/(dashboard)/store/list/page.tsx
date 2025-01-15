'use client';

import { StoreListing, StoreListingContent, StoreListingHeader } from '../../../../core/ui';
import ColumnsListing from './ui/table';

export default function Page() {
	return (
		<div className="w-full p-16 h-full">
			<div className="h-full">
				<StoreListing apiKey="stores/list" showInactive={0}>
					<StoreListingHeader />
					<StoreListingContent>
						<ColumnsListing />
					</StoreListingContent>
				</StoreListing>
			</div>
		</div>
	);
}
