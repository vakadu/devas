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

const AddEditAttributes = dynamic(() => import('./ui/attributes/attributes-list'), {
	loading: () => <Spinner />,
});

const ImagesList = dynamic(() => import('./ui/upload-images/images-list'), {
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
		<div className="m-16 bg-white p-16 rounded-8">
			<Tabs className="" value={type} onValueChange={handleChange}>
				<TabsList className="w-full justify-start mb-24">
					<TabsTrigger
						className="flex-1 data-[state=active]:bg-black-1 data-[state=active]:text-white py-12"
						value="product"
					>
						Add Product
					</TabsTrigger>
					<TabsTrigger
						className="flex-1 data-[state=active]:bg-black-1 data-[state=active]:text-white py-12"
						value="images"
					>
						Product Images
					</TabsTrigger>
					<TabsTrigger
						className="flex-1 data-[state=active]:bg-black-1 data-[state=active]:text-white py-12"
						value="attributes"
					>
						Attributes
					</TabsTrigger>
				</TabsList>
				<TabsContent value="product">
					<AddCatalougeProduct type="EDIT" />
				</TabsContent>
				<TabsContent value="images">
					<ImagesList />
				</TabsContent>
				<TabsContent value="attributes">
					<EditProductProvider>
						<AddEditAttributes />
					</EditProductProvider>
				</TabsContent>
			</Tabs>
		</div>
	);
}
