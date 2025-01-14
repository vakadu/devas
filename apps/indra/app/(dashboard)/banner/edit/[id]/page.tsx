'use client';

import dynamic from 'next/dynamic';

import { Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from '@devas/ui';

const AddEditImages = dynamic(() => import('./ui/add-edit-images'), {
	loading: () => <Spinner />,
});

const AddEditBanner = dynamic(
	() => import('../../../../../core/ui').then((mod) => mod.AddEditBanner),
	{
		loading: () => <Spinner />,
		ssr: false,
	}
);

export default function Page() {
	return (
		<div className="m-16 rounded-8">
			<Tabs defaultValue="details" className="">
				<TabsList className="w-full justify-start mb-12 bg-white">
					<TabsTrigger className="flex-1 py-12" value="details">
						Edit Banner
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="images">
						Edit Images
					</TabsTrigger>
				</TabsList>
				<TabsContent className="bg-white p-16 rounded-12 mt-0" value="details">
					<AddEditBanner type="EDIT" />
				</TabsContent>
				<TabsContent className="bg-white p-16 rounded-12 mt-0" value="images">
					<AddEditImages />
				</TabsContent>
			</Tabs>
		</div>
	);
}
