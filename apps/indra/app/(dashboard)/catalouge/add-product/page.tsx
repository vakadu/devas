'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@devas/ui';
import AddProduct from './ui/add-product';

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
			<Tabs value={type} onValueChange={handleChange}>
				<TabsList>
					<TabsTrigger value="product">Add Product</TabsTrigger>
					<TabsTrigger value="images">Product Images</TabsTrigger>
					<TabsTrigger value="attributes">Attributes</TabsTrigger>
				</TabsList>
				<TabsContent value="product">
					<AddProduct />
				</TabsContent>
				<TabsContent value="images">Change your password here.</TabsContent>
				<TabsContent value="attributes">Change your password here.</TabsContent>
			</Tabs>
		</div>
	);
}