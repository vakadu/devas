'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import {
	Form,
	Button,
	FormField,
	FormItem,
	FormLabel,
	Select,
	FormControl,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	FormMessage,
} from '@devas/ui';
import { FormFieldRenderer } from './form-renderer';
import { useGetStoreProductById } from '../../api';
import { Routes } from '../../primitives';
import { useUpdateStoreProduct } from '../../../app/(dashboard)/store/products/edit/[storeId]/[id]/api/update-product';
import { useQueryClient } from '@tanstack/react-query';

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
	comment: z.string().optional(),
	status: z.string().min(1, { message: 'Status is required' }),
	active: z.string().min(1, { message: 'Active is required' }),
});

type IFormData = z.infer<typeof schema>;

export function EditStoreProduct() {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			quantity: '',
			price: '',
			discount: '',
			comment: '',
			status: '',
			active: '',
		},
	});
	const router = useRouter();
	const searchParams = useSearchParams();
	const storeProductId = searchParams.get('storeProductId');
	const { data } = useGetStoreProductById(storeProductId as string);
	const { mutateAsync: updateStoreProduct, isPending } = useUpdateStoreProduct(
		storeProductId as string
	);
	const queryClient = useQueryClient();

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
			{
				name: 'comment',
				label: 'Comment',
				type: 'textfield',
				keyboardType: 'default',
			},
		],
		[]
	);

	useEffect(() => {
		if (data?.data?.storeProduct) {
			form.setValue('price', data?.data?.storeProduct.price.toString() || '');
			form.setValue('quantity', data?.data?.storeProduct.quantity.toString() || '');
			form.setValue('discount', data?.data?.storeProduct.discount.toString() || '');
			form.setValue('comment', data?.data?.storeProduct.comment || '');
			form.setValue('status', data?.data?.storeProduct.status || '');
			form.setValue('active', data?.data?.storeProduct.active ? 'true' : 'false');
		}
	}, [data?.data?.storeProduct, form]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			quantity: Number(values.quantity),
			price: Number(values.price),
			discount: Number(values.discount),
			comment: values.comment,
			status: values.status,
			active: values.active === 'true',
		};
		const reponse = await updateStoreProduct(payload);
		if (reponse.status === 'SUCCESS') {
			await queryClient.invalidateQueries({
				queryKey: ['stores/list'],
				type: 'active',
			});
			router.push(`${Routes.StoreProductList}/${reponse.data.storeProduct.storeId}`);
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
						<FormField
							control={form.control}
							name="active"
							render={({ field: selectField, fieldState }) => {
								return (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<Select
											onValueChange={selectField.onChange}
											defaultValue={selectField.value}
											value={selectField.value}
										>
											<FormControl>
												<SelectTrigger
													isError={!!fieldState.error}
													className="!mt-6 bg-white"
												>
													<SelectValue placeholder="Select a type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="true">Active</SelectItem>
												<SelectItem value="false">InActive</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field: selectField, fieldState }) => {
								return (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select
											onValueChange={selectField.onChange}
											defaultValue={selectField.value}
											value={selectField.value}
										>
											<FormControl>
												<SelectTrigger
													isError={!!fieldState.error}
													className="!mt-6 bg-white"
												>
													<SelectValue placeholder="Select a Status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="ADDED">Added</SelectItem>
												<SelectItem value="HOLD">Hold</SelectItem>
												<SelectItem value="APPROVED">Approved</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<div className="col-span-2">
							<Button
								disabled={isPending}
								loading={isPending}
								type="submit"
								className="w-[240px]"
							>
								Update
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
