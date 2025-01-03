import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@devas/ui';
import { useCreateProduct } from '../../app/(dashboard)/catalouge/add-product/api';
import {
	useGetProductById,
	useUpdateProduct,
} from '../../app/(dashboard)/catalouge/edit-product/[id]/api';
import { Routes } from '../primitives';

const schema = z.object({
	title: z.string().min(3, { message: 'Title is required' }),
	description: z.string().min(6, { message: 'Description is required' }),
	quantity: z.string().min(1, { message: 'Quantity must be at least 1' }),
	packQuantity: z.string().min(1, { message: 'Pack Quantity must be at least 1' }),
	mrp: z.string().min(1, { message: 'MRP is required' }),
	price: z.string().min(1, { message: 'Price is required' }),
	gstInPercent: z.string().min(0).max(100, { message: 'GST must be between 0 and 100' }),
	hsn: z.string().min(1, { message: 'HSN is required' }),
	brand: z.string().min(1, { message: 'Brand is required' }),
	category: z.string().min(1, { message: 'Category is required' }),
	subcategory: z.string().min(1, { message: 'Subcategory is required' }),
	colour: z.string().optional(),
	size: z.string().optional(),
});

type IFormData = z.infer<typeof schema>;

export function AddCatalougeProduct({ type }: { type: 'ADD' | 'EDIT' }) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: '',
			description: '',
			quantity: '',
			packQuantity: '',
			mrp: '',
			price: '',
			gstInPercent: '',
			hsn: '',
			brand: '',
			category: '',
			subcategory: '',
			colour: '',
			size: '',
		},
	});
	const { mutateAsync: createProduct, isPending } = useCreateProduct();
	const params = useParams();
	const { data, refetch } = useGetProductById(params?.id as string);
	const productData = data?.data?.product || ({} as ICatalougeTypes.IProduct);
	const { mutateAsync: updateProduct, isPending: isLoading } = useUpdateProduct(
		params?.id as string
	);
	const router = useRouter();

	useEffect(() => {
		if (type === 'EDIT' && params?.id) {
			form.reset({
				title: productData?.title || '',
				description: productData?.description || '',
				quantity: productData?.quantity?.toString() || '',
				packQuantity: productData?.packQuantity?.toString() || '',
				mrp: productData?.mrp?.toString() || '',
				price: productData?.price?.toString() || '',
				gstInPercent: productData?.gstInPercent?.toString() || '',
				hsn: productData?.hsn || '',
				brand: productData?.brand || '',
				category: productData?.category || '',
				subcategory: productData?.subcategory || '',
				colour: productData?.colour || '',
				size: productData?.size || '',
			});
		}
	}, [
		form,
		params?.id,
		productData?.brand,
		productData?.category,
		productData?.colour,
		productData?.description,
		productData?.gstInPercent,
		productData?.hsn,
		productData?.mrp,
		productData?.packQuantity,
		productData?.price,
		productData?.quantity,
		productData?.size,
		productData?.subcategory,
		productData?.title,
		type,
	]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			title: values.title as string,
			description: values.description as string,
			quantity: Number(values.quantity) as number,
			packQuantity: Number(values.packQuantity) as number,
			mrp: Number(values.mrp) as number,
			price: Number(values.price) as number,
			gstInPercent: Number(values.gstInPercent) as number,
			hsn: values.hsn as string,
			brand: values.brand as string,
			category: values.category as string,
			subcategory: values.subcategory as string,
			colour: values.colour as string,
			size: values.size as string,
		};
		if (type === 'ADD') {
			const response = await createProduct(payload);
			if (response.status === 'SUCCESS') {
				const id = response?.data?.product?.productId;
				form.reset();
				router.push(`${Routes.CatalougeEditProduct}/${id}?type=images`);
			}
		} else {
			const response = await updateProduct(payload);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		}
	};

	return (
		<div className="max-w-[720px]">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-24 grid grid-cols-2 gap-x-24 gap-y-24"
				>
					{(
						[
							['title', 'Title'],
							['description', 'Description'],
							['quantity', 'Quantity', 'numeric'],
							['packQuantity', 'Pack Quantity', 'numeric'],
							['mrp', 'MRP', 'numeric'],
							['price', 'Price', 'numeric'],
							['gstInPercent', 'GST in Percent', 'numeric'],
							['hsn', 'HSN'],
							['brand', 'Brand'],
							['category', 'Category'],
							['subcategory', 'Subcategory'],
							['colour', 'Colour'],
							['size', 'Size'],
						] as const
					).map(([name, label, type]) => (
						<FormField
							key={name}
							control={form.control}
							name={name as keyof IFormData}
							render={({ field, fieldState }) => (
								<FormItem className="relative">
									<FormControl>
										<FloatingInput
											label={label}
											id={name}
											isError={!!fieldState.error}
											type={type || 'text'}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					<Button
						disabled={isPending || isLoading}
						loading={isPending || isLoading}
						loadingText={
							type === 'EDIT' ? 'Updating Product...' : 'Creating Product...'
						}
						type="submit"
						className="w-[240px] col-span-2"
					>
						{type === 'EDIT' ? 'Update' : 'Add'}
					</Button>
				</form>
			</Form>
		</div>
	);
}
