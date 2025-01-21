'use client';

import { PlusIcon } from 'lucide-react';
import { StoreListing, StoreListingContent, StoreListingHeader } from '../../../../core/ui';
import ColumnsListing from './ui/table';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@devas/ui';
import { AddEditStore } from './ui/form';
import { useState } from 'react';

export default function Page() {
	const [show, setShow] = useState(false);

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
					<Sheet open={show} onOpenChange={setShow}>
						<SheetTrigger className="fixed bottom-12 right-12 flex justify-center items-center gap-8 bg-primary shadow-lg px-12 py-8 text-white cursor-pointer w-[54px] h-[54px] rounded-full">
							<PlusIcon className="size-24" />
						</SheetTrigger>
						<SheetContent side="bottom">
							<SheetHeader>
								<SheetTitle>Add a new Store</SheetTitle>
								<SheetDescription></SheetDescription>
								<AddEditStore setShow={setShow} />
							</SheetHeader>
						</SheetContent>
					</Sheet>
				</StoreListing>
			</div>
		</div>
	);
}
