'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';

import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SheetClose,
	SheetFooter,
} from '@devas/ui';
import { useUpdateBannerImageAttributes } from '../api/update-banner-image-attributes';

type IFormData = {
	title: string;
	description: string;
	xPriority: string;
	yPriority: string;
	active: string;
};

interface IEditImageProps {
	details: ICatalougeTypes.IBannerImage;
	id: string;
	setUpdateDetails: (type: boolean) => void;
	refetch: () => void;
}

const schema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	description: z.string().min(5, { message: 'Description is required' }),
	xPriority: z.string().min(1, { message: 'xPriority is required' }),
	yPriority: z.string().min(1, { message: 'yPriority is required' }),
	active: z.string().min(1, { message: 'Type is required' }),
});

export default function EditImage({ details, id, setUpdateDetails, refetch }: IEditImageProps) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: details?.title || '',
			description: details?.description || '',
			xPriority: details?.xPriority?.toString() || '',
			yPriority: details?.yPriority?.toString() || '',
			active: details?.active?.toString() || 'true',
		},
	});

	const { mutateAsync: updateBannerImageAttributes, isPending } =
		useUpdateBannerImageAttributes(id);

	useEffect(() => {
		if (details && id) {
			form.reset({
				title: details.title || '',
				description: details.description || '',
				xPriority: details.xPriority?.toString() || '',
				yPriority: details.yPriority?.toString() || '',
				active: details.active?.toString() || 'true',
			});
		}
	}, [details, id, form]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			title: values.title,
			description: values.description,
			xPriority: Number(values.xPriority),
			yPriority: Number(values.yPriority),
			active: values.active === 'true',
			bannerImageId: details._id,
			productIds: ['1735879743983790', '1735727913275564'],
		};
		const response = await updateBannerImageAttributes(payload);
		if (response.status === 'SUCCESS') {
			setUpdateDetails(false);
			refetch();
		}
	};

	const fields = useMemo(
		() => [
			{ name: 'title', label: 'Title' },
			{ name: 'description', label: 'Description' },
			{
				name: 'xPriority',
				label: 'xPriority',
				type: 'select',
				options: Array.from({ length: 9 }, (_, i) => ({
					value: String(i),
					label: String(i),
				})),
			},
			{
				name: 'yPriority',
				label: 'yPriority',
				type: 'select',
				options: Array.from({ length: 9 }, (_, i) => ({
					value: String(i),
					label: String(i),
				})),
			},
			{
				name: 'active',
				label: 'Type',
				type: 'select',
				options: [
					{ value: 'true', label: 'Active' },
					{ value: 'false', label: 'Inactive' },
				],
			},
		],
		[]
	);

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-24">
					<div className="grid grid-cols-2 gap-x-24 gap-y-24 mx-auto max-w-screen-xl">
						{fields.map(({ name, label, type, options }) => {
							if (type === 'select' && options) {
								return (
									<FormField
										key={name}
										control={form.control}
										name={name as keyof IFormData}
										render={({ field: selectField, fieldState }) => (
											<FormItem>
												<Select
													onValueChange={selectField.onChange}
													value={selectField.value}
												>
													<FormControl>
														<SelectTrigger
															isError={!!fieldState.error}
															className="!mt-6 bg-white"
														>
															<SelectValue
																placeholder={`Select ${label}`}
															/>
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{options.map((option) => (
															<SelectItem
																key={option.value}
																value={option.value}
															>
																{option.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
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
										<FormItem>
											<FormControl>
												<FloatingInput
													label={label}
													id={name}
													isError={!!fieldState.error}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							);
						})}
					</div>
					<SheetFooter className="mt-32">
						<SheetClose asChild>
							<Button className="w-[180px]" variant="outline">
								Close
							</Button>
						</SheetClose>
						<Button
							disabled={isPending}
							loading={isPending}
							type="submit"
							className="w-[180px]"
						>
							Submit
						</Button>
					</SheetFooter>
				</form>
			</Form>
		</div>
	);
}
