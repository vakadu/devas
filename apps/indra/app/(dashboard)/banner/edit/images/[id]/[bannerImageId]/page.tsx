'use client';

import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from '@devas/ui';
import {
	ProductListing,
	ProductListingContent,
	ProductListingHeader,
} from '../../../../../../../core/ui';

const EditImageDetails = dynamic(() => import('./ui/form'), {
	loading: () => <Spinner />,
});

const ColumnsListing = dynamic(() => import('./ui/table'), {
	loading: () => <Spinner />,
});

export default function Index() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const type = params.get('type') as string;

	const handleChange = (val: string) => {
		const searchParams = new URLSearchParams(params.toString());
		searchParams.set('type', val);
		router.replace(`${pathname}?${searchParams.toString()}`);
	};

	return (
		<div className="m-16 rounded-8">
			<Tabs defaultValue="details" value={type} onValueChange={handleChange} className="">
				<TabsList className="w-full justify-start mb-12 bg-white">
					<TabsTrigger className="flex-1 py-12" value="products">
						Add Products
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="details">
						Edit Details
					</TabsTrigger>
				</TabsList>
				<TabsContent className="mt-0" value="products">
					<ProductListing showInactive={1} apiKey="products/banners">
						<ProductListingHeader />
						<ProductListingContent>
							<ColumnsListing handleChange={handleChange} />
						</ProductListingContent>
					</ProductListing>
				</TabsContent>
				<TabsContent className="bg-white p-16 rounded-12 mt-0" value="details">
					<EditImageDetails handleChange={handleChange} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
