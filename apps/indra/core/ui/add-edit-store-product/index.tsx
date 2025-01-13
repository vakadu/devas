'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';

import { Form, Button } from '@devas/ui';
import { FormFieldRenderer } from './form-renderer';
import { ListingContent, ListingHeader } from '../listing';
import ProductListTable from './table';
import { useEffect, useMemo } from 'react';
import { useListingContext } from '../listing/context';
import { useGetProductById } from '../../../app/(dashboard)/products/edit/[id]/api';
import { useCreateStoreProduct } from '../../../app/(dashboard)/store/add/[id]/api/add-product';

const schema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	quantity: z
		.string()
		.min(1, { message: 'Quantity is required' })
		.refine((val) => Number(val) >= 0, {
			message: 'Quantity must be a positive number',
		}),
	price: z
		.string()
		.min(1, { message: 'Price is required' })
		.refine((val) => Number(val) >= 0, {
			message: 'Price must be a positive number',
		}),
	discount: z
		.string()
		.min(1, { message: 'Discount is required' })
		.refine((val) => Number(val) >= 0, {
			message: 'Discount must be a positive number',
		}),
	comment: z.string().optional(),
});

type IFormData = z.infer<typeof schema>;

export function AddEditStoreProduct({ type }: { type: 'ADD' | 'EDIT' }) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: '',
			quantity: '',
			price: '',
			discount: '',
			comment: '',
		},
	});
	const params = useParams();
	const { setRowSelection, rowSelection } = useListingContext();
	const currentProductId =
		(Object.keys(rowSelection).length > 0 && Object.keys(rowSelection)[0]) || '';
	const { data } = useGetProductById(currentProductId);
	const { mutateAsync: createStoreProduct, isPending } = useCreateStoreProduct();
	const fields = useMemo(
		() => [
			{ name: 'title', label: 'Title', keyboardType: 'text', type: 'text', readOnly: true },
			{
				name: 'price',
				label: 'Price',
				keyboardType: 'numeric',
				type: 'text',
				readOnly: false,
			},
			{
				name: 'quantity',
				label: 'Quantity',
				keyboardType: 'numeric',
				type: 'text',
				readOnly: false,
			},
			{
				name: 'discount',
				label: 'Discount',
				keyboardType: 'numeric',
				type: 'text',
				readOnly: false,
			},
			{
				name: 'comment',
				label: 'Comment',
				type: 'textfield',
				keyboardType: 'default',
				readOnly: false,
			},
		],
		[]
	);

	useEffect(() => {
		if (data?.data?.product) {
			form.setValue('title', data?.data?.product?.title);
		}
	}, [data?.data?.product, form]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			storeId: params?.id as string,
			productId: Object.keys(rowSelection)[0] as string,
			quantity: Number(values.quantity),
			price: Number(values.price),
			discount: Number(values.discount),
			comment: values.comment,
		};
		const reponse = await createStoreProduct(payload);
		console.log(reponse);
	};

	return (
		<div className="grid grid-cols-5 gap-24 h-[calc(100vh-260px)]">
			<div className="col-span-2 flex flex-col gap-24">
				<div className="bg-white p-16 rounded-8 shadow-card1">
					<h2 className="mb-12 font-medium font-18">Add Form Details</h2>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid grid-cols-2 gap-x-24 gap-y-24"
						>
							{fields.map((field) => (
								<FormFieldRenderer key={field.name} field={field} form={form} />
							))}
							<div className="col-span-2">
								<Button
									disabled={isPending}
									loading={isPending}
									type="submit"
									className="w-[240px]"
								>
									{type === 'EDIT' ? 'Update' : 'Add'}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
			<div className="col-span-3">
				<ListingHeader />
				<ListingContent>
					<ProductListTable setRowSelection={setRowSelection} />
				</ListingContent>
			</div>
		</div>
	);
}
