'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from '@devas/ui';
import { ListingContent, ListingHeader, ProductListing } from '../../../../../../core/ui';

const AddStoreProduct = dynamic(
	() => import('../../../../../../core/ui').then((mod) => mod.AddStoreProduct),
	{
		loading: () => <Spinner />,
		ssr: false,
	}
);

const StoreProductsListTable = dynamic(() => import('./ui/table').then((mod) => mod.default), {
	loading: () => <Spinner />,
	ssr: false,
});

export default function Page() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const type = params.get('type') as string;
	const id = params.get('id') as string;

	const handleChange = (val: string, id?: string, storeProductId?: string) => {
		const searchParams = new URLSearchParams();
		searchParams.set('type', val);
		if (id) {
			searchParams.set('id', id);
		}
		router.replace(`${pathname}?${searchParams.toString()}`);
	};

	return (
		<div className="m-16 p-16 rounded-8">
			<Tabs value={type} onValueChange={handleChange}>
				<TabsList className="w-full justify-start mb-12 bg-white">
					<TabsTrigger className="flex-1 py-12" value="product">
						Add Product
					</TabsTrigger>
					<TabsTrigger disabled={!id} className="flex-1 py-12" value="details">
						Add Product Details
					</TabsTrigger>
				</TabsList>
				<TabsContent className="bg-white p-16 rounded-12 mt-0" value="product">
					<ProductListing>
						<ListingHeader />
						<ListingContent>
							<StoreProductsListTable handleChange={handleChange} />
						</ListingContent>
					</ProductListing>
				</TabsContent>
				<TabsContent className="rounded-12 mt-0" value="details">
					<AddStoreProduct />
				</TabsContent>
			</Tabs>
		</div>
	);
}
