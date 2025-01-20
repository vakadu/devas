'use client';

import { PlusIcon } from 'lucide-react';
import { StoreListing, StoreListingContent, StoreListingHeader } from '../../../../core/ui';
import ColumnsListing from './ui/table';

export default function Page() {
	return (
		<div className="w-full h-full">
			<div className="h-full">
				<StoreListing
					apiKey="stores/list"
					showInactive={0}
					className="m-16 shadow-card1 bg-white rounded-8"
				>
					<StoreListingHeader />
					<StoreListingContent>
						<ColumnsListing />
					</StoreListingContent>
				</StoreListing>
			</div>
			<div>
				<PlusIcon />
				<span>Add Store</span>
			</div>
		</div>
	);
}
