'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from '@devas/ui';

const AddCatalougeProduct = dynamic(
    () => import('../../../../../core/ui').then((mod) => mod.AddCatalougeProduct),
    {
        loading: () => <Spinner />,
        ssr: false,
    }
);

const AddEditAttributes = dynamic(() => import('./ui/add-edit-attributes'), {
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
            <Tabs value={type} onValueChange={handleChange}>
                <TabsList>
                    <TabsTrigger value="product">Add Product</TabsTrigger>
                    <TabsTrigger value="images">Product Images</TabsTrigger>
                    <TabsTrigger value="attributes">Attributes</TabsTrigger>
                </TabsList>
                <TabsContent value="product">
                    <AddCatalougeProduct type="EDIT" />
                </TabsContent>
                <TabsContent value="images">Change your password here.</TabsContent>
                <TabsContent value="attributes">
                    <AddEditAttributes />
                </TabsContent>
            </Tabs>
        </div>
    );
}
