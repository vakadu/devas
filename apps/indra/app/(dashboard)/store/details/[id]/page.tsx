'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from '@devas/ui';

const StoreDetails = dynamic(() => import('./ui/store-details'), {
	loading: () => <Spinner />,
});

const Listing = dynamic(() => import('./ui/listing'), {
	loading: () => <Spinner />,
});

export default function Page() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	const searchparams = useSearchParams();
	const type = searchparams.get('type') as string;

	const handleChange = (val: string) => {
		router.replace(`${pathname}?type=${val}`);
	};

	return (
		<Tabs className="m-16" value={type} onValueChange={handleChange}>
			<TabsList className="w-full justify-start mb-12 bg-white">
				<TabsTrigger className="flex-1 py-12" value="details">
					Store Details
				</TabsTrigger>
				<TabsTrigger className="flex-1 py-12" value="products">
					Products List
				</TabsTrigger>
			</TabsList>
			<TabsContent className="mt-0" value="details">
				<StoreDetails id={params?.id as string} />
			</TabsContent>
			<TabsContent className="mt-0" value="products">
				<Listing />
			</TabsContent>
		</Tabs>
	);
}
