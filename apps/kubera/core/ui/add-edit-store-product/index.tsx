'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { Form, Button } from '@devas/ui';
import { FormFieldRenderer } from './form-renderer';
import { Routes } from '../../primitives';
import { useAppSelector } from '../../store';
import { useCreateStoreProduct } from '../../api';

const schema = z.object({
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
});

type IFormData = z.infer<typeof schema>;

export function AddStoreProduct() {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			quantity: '',
			price: '',
			discount: '',
		},
	});
	const router = useRouter();
	const searchParams = useSearchParams();
	const productId = searchParams.get('id');
	const { mutateAsync: createStoreProduct, isPending } = useCreateStoreProduct();
	const auth = useAppSelector((state) => state.auth);
	const fields = useMemo(
		() => [
			{
				name: 'price',
				label: 'Price',
				keyboardType: 'numeric',
				type: 'text',
			},
			{
				name: 'quantity',
				label: 'Quantity',
				keyboardType: 'numeric',
				type: 'text',
			},
			{
				name: 'discount',
				label: 'Discount',
				keyboardType: 'numeric',
				type: 'text',
			},
		],
		[]
	);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			storeId: auth.userId as string,
			productId: productId as string,
			quantity: Number(values.quantity),
			price: Number(values.price),
			discount: Number(values.discount),
		};
		const reponse = await createStoreProduct(payload);
		if (reponse.status === 'SUCCESS') {
			router.push(`${Routes.Home}`);
		}
	};

	return (
		<div className="bg-white p-16 rounded-8 max-w-[720px]">
			<div className="">
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
								Add
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
