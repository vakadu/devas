'use client';

import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const type = params.get('type') as string;

	const handleChange = (val: string) => {
		router.replace(`${pathname}?type=${val}`);
	};

	return (
		<div className="m-16 rounded-8">
			<Tabs value={type} onValueChange={handleChange} className="">
				<TabsList className="w-full justify-start mb-12 bg-white">
					<TabsTrigger className="flex-1 py-12" value="details">
						Edit Banner
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="images">
						Edit Images
					</TabsTrigger>
				</TabsList>
				<TabsContent className="mt-0 grid grid-cols-3" value="details">
					<AddEditBanner type="EDIT" />
				</TabsContent>
				<TabsContent className="mt-0" value="images">
					<AddEditImages />
				</TabsContent>
			</Tabs>
		</div>
	);
}
