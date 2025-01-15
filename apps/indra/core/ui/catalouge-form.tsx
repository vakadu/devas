'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import {
	Button,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Command,
	Spinner,
	FloatingTextArea,
} from '@devas/ui';
import { useCreateProduct } from '../../app/(dashboard)/products/add/api';
import { useGetProductById, useUpdateProduct } from '../../app/(dashboard)/products/edit/[id]/api';
import { Routes } from '../primitives';
import { useGetDropdownList } from '../api';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@devas/utils';

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
	const { data: categoryData, isPending: dropdownLoading } = useGetDropdownList('CATEGORIES');
	const { data: brandsData } = useGetDropdownList('BRANDS');
	const [subCategories, setSubCategories] = useState<ICommonTypes.ISubcategory[]>([]);
	const category = form.watch('category');

	useEffect(() => {
		if (categoryData?.data?.dropdown && Boolean(category)) {
			const subCatData = categoryData.data?.dropdown.find((cat) => cat.value === category);
			if (subCatData?.subcategories) {
				setSubCategories(subCatData?.subcategories);
			}
		}
	}, [category, categoryData?.data?.dropdown]);

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
				router.push(`${Routes.EditProduct}/${id}?type=images`);
			}
		} else {
			const response = await updateProduct(payload);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		}
	};

	if (dropdownLoading) {
		return <Spinner />;
	}

	return (
		<div className="max-w-[720px]">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-24 grid grid-cols-2 gap-x-24 gap-y-24"
				>
					{(
						[
							['title', 'Title', 'text', 'textarea'],
							['description', 'Description', 'text', 'textarea'],
							['quantity', 'Quantity', 'numeric'],
							['packQuantity', 'Pack Quantity', 'numeric'],
							['mrp', 'MRP', 'numeric'],
							['price', 'Price', 'numeric'],
							['gstInPercent', 'GST in Percent', 'numeric'],
							['hsn', 'HSN', 'text'],
							['colour', 'Colour', 'text'],
							['size', 'Size', 'text'],
							[
								'category',
								'Category',
								'text',
								'select',
								{
									options: categoryData?.data?.dropdown ?? [],
								} as { options: Array<{ value: string; label: string }> },
							],
							[
								'subcategory',
								'Subcategory',
								'text',
								'select',
								{
									options: subCategories ?? [],
								} as { options: Array<{ value: string; label: string }> },
							],
							[
								'brand',
								'Brand',
								'text',
								'select',
								{ options: brandsData?.data?.dropdown || [] },
								{
									options: brandsData?.data?.dropdown ?? [],
								} as { options: Array<{ value: string; label: string }> },
							],
						] as const
					).map(([name, label, type, select, { options = [] } = {}]) => {
						if (select === 'select') {
							return (
								<FormField
									control={form.control}
									name={name as keyof IFormData}
									key={name}
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel>{label}</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant="outline"
															role="combobox"
															className={cn(
																'justify-between h-48 border-grey-light',
																!field.value &&
																	'text-muted-foreground'
															)}
														>
															<span className="text-14 font-normal">
																{field.value
																	? options &&
																	  options.find(
																			(option) =>
																				option.value ===
																				field.value
																	  )?.label
																	: 'Select an Option'}
															</span>
															<ChevronsUpDown className="opacity-50 !size-16" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-[320px] p-0">
													<Command>
														<CommandInput
															placeholder="Search ..."
															className="h-42"
														/>
														<CommandList>
															<CommandEmpty>
																No options found.
															</CommandEmpty>
															<CommandGroup>
																{options &&
																	options.map((option) => (
																		<CommandItem
																			value={option.label}
																			key={option.value}
																			onSelect={() => {
																				form.setValue(
																					name,
																					option.value
																				);
																			}}
																		>
																			{option.label}
																			<Check
																				className={cn(
																					'ml-auto',
																					option.value ===
																						field.value
																						? 'opacity-100'
																						: 'opacity-0'
																				)}
																			/>
																		</CommandItem>
																	))}
															</CommandGroup>
														</CommandList>
													</Command>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
							);
						} else if (select === 'textarea') {
							return (
								<FormField
									key={name}
									control={form.control}
									name={name as keyof IFormData}
									render={({ field: inputField, fieldState }) => (
										<FormItem className="relative col-span-1">
											<FormControl>
												<FloatingTextArea
													label={label}
													id={name}
													isError={!!fieldState.error}
													{...inputField}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							);
						}
						return (
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
						);
					})}
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
