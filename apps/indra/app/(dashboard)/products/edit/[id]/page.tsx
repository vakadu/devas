'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from '@devas/ui';
import { EditProductProvider } from './context/edit-product';

const AddCatalougeProduct = dynamic(
	() => import('../../../../../core/ui').then((mod) => mod.AddCatalougeProduct),
	{
		loading: () => <Spinner />,
		ssr: false,
	}
);

const AddEditAttributes = dynamic(() => import('./ui/attributes'), {
	loading: () => <Spinner />,
});

const ImagesContainer = dynamic(() => import('./ui/upload-images'), {
	loading: () => <Spinner />,
});

const Varaints = dynamic(() => import('./ui/variants'), {
	loading: () => <Spinner />,
});

export default function Page() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const type = params.get('type') as string;

	const handleChange = (val: string) => {
		router.replace(`${pathname}?type=${val}`);
	};

	return (
		<div className="m-16 rounded-8">
			<Tabs className="" value={type} onValueChange={handleChange}>
				<TabsList className="w-full justify-start mb-12 bg-white">
					<TabsTrigger className="flex-1 py-12" value="product">
						Update Product
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="images">
						Product Images
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="attributes">
						Attributes
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="variants">
						Variants
					</TabsTrigger>
				</TabsList>
				<TabsContent className="mt-0" value="product">
					<AddCatalougeProduct type="EDIT" />
				</TabsContent>
				<TabsContent className="mt-0" value="images">
					<ImagesContainer />
				</TabsContent>
				<TabsContent className="mt-0" value="attributes">
					<EditProductProvider>
						<AddEditAttributes />
					</EditProductProvider>
				</TabsContent>
				<TabsContent className="mt-0" value="variants">
					<Varaints />
				</TabsContent>
			</Tabs>
		</div>
	);
}
