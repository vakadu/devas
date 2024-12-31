import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, FloatingInput, Form, FormControl, FormField, FormItem, FormMessage } from '@devas/ui';
import { useCreateProduct } from '../api';

const schema = z.object({
    title: z.string().min(3, { message: 'Title is required' }),
    description: z.string().min(6, { message: 'Description is required' }),
    quantity: z.coerce.number().int().min(1, { message: 'Quantity must be at least 1' }),
    packQuantity: z.coerce.number().int().min(1, { message: 'Pack Quantity must be at least 1' }),
    mrp: z.coerce.number().min(1, { message: 'MRP must be a positive number' }),
    price: z.coerce.number().min(1, { message: 'Price must be a positive number' }),
    gstInPercent: z.coerce.number().min(0).max(100, { message: 'GST must be between 0 and 100' }),
    hsn: z.string().min(1, { message: 'HSN is required' }),
    brand: z.string().min(1, { message: 'Brand is required' }),
    category: z.string().min(1, { message: 'Category is required' }),
    subcategory: z.string().min(1, { message: 'Subcategory is required' }),
    colour: z.string().optional(),
    size: z.string().optional(),
});

type IFormData = z.infer<typeof schema>;

export default function AddProduct() {
    const form = useForm<IFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            quantity: 0,
            packQuantity: 0,
            mrp: 0,
            price: 0,
            gstInPercent: 0,
            hsn: '',
            brand: '',
            category: '',
            subcategory: '',
            colour: '',
            size: '',
        },
    });
    const { mutateAsync: createProduct, isPending } = useCreateProduct();

    const onSubmit = async (values: IFormData) => {
        const { ...rest } = values;
        const payload = { ...rest };
        const response = await createProduct(payload);
        if (response.status === 'SUCCESS') {
            form.reset()
        }
    };

    return (
        <div className='max-w-[720px]'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-24 grid grid-cols-2 gap-x-24 gap-y-24">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="Title"
                                        id="title"
                                        isError={!!fieldState.error}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="Description"
                                        id="description"
                                        isError={!!fieldState.error}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="Quantity"
                                        id="quantity"
                                        isError={!!fieldState.error}
                                        type="numeric"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="packQuantity"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="Pack Quantity"
                                        id="packQuantity"
                                        isError={!!fieldState.error}
                                        type="numeric"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mrp"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="Mrp"
                                        id="mrp"
                                        isError={!!fieldState.error}
                                        type="numeric"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="Price"
                                        id="price"
                                        isError={!!fieldState.error}
                                        type="numeric"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gstInPercent"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="GST in Percent"
                                        id="gstInPercent"
                                        isError={!!fieldState.error}
                                        type="numeric"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="hsn"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="HSN"
                                        id="hsn"
                                        isError={!!fieldState.error}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="brand"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="Brand"
                                        id="brand"
                                        isError={!!fieldState.error}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="Category"
                                        id="category"
                                        isError={!!fieldState.error}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subcategory"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="Sub Category"
                                        id="subcategory"
                                        isError={!!fieldState.error}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="colour"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="Colour"
                                        id="colour"
                                        isError={!!fieldState.error}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="size"
                        render={({ field, fieldState }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <FloatingInput
                                        label="Size"
                                        id="size"
                                        isError={!!fieldState.error}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={isPending}
                        loading={isPending}
                        loadingText="Creating Product..."
                        type="submit"
                        className="w-[240px] col-span-2"
                    >
                        Add
                    </Button>
                </form>
            </Form>
        </div>
    )
}
