'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

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
} from '@devas/ui';
import useCreateBanner from '../../app/(dashboard)/banner/add/api/create-banner';
import { useGetBannerById } from '../../app/(dashboard)/banner/edit/[id]/api/get-banner-by-id';
import { useEffect } from 'react';
import useUpdateBanner from '../../app/(dashboard)/banner/edit/[id]/api/update-banner';
import { Routes } from '../primitives';

const schema = z.object({
	title: z.string().min(3, { message: 'Title is required' }),
	description: z.string().min(6, { message: 'Description is required' }),
	type: z.string().min(1, { message: 'Type is required' }),
	active: z.string().min(1, { message: 'Active status is required' }),
});

type IFormData = z.infer<typeof schema>;

export function AddEditBanner({ type }: { type: 'ADD' | 'EDIT' }) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: '',
			description: '',
			type: '',
			active: 'true',
		},
	});
	const params = useParams();
	const router = useRouter();
	const { mutateAsync: createBanner, isPending } = useCreateBanner();
	const { mutateAsync: updateBanner, isPending: isLoading } = useUpdateBanner(
		params?.id as string
	);
	const { data, refetch } = useGetBannerById(params?.id as string);

	useEffect(() => {
		if (type === 'EDIT' && params?.id) {
			form.reset({
				title: data?.data?.banner?.title || '',
				description: data?.data?.banner?.description || '',
				type: data?.data?.banner?.type || '',
				active: data?.data?.banner?.active.toString() || 'true',
			});
		}
	}, [
		data?.data?.banner?.active,
		data?.data?.banner?.description,
		data?.data?.banner?.title,
		data?.data?.banner?.type,
		form,
		params?.id,
		type,
	]);

	const onSubmit = async (values: IFormData) => {
		if (type === 'ADD') {
			const { active, ...rest } = values;
			const response = await createBanner(rest);
			if (response.status === 'SUCCESS') {
				form.reset();
				router.push(`${Routes.EditBanner}/${response.data.banner._id}`);
			}
		} else {
			const { active, ...rest } = values;
			const updatedActive = active === 'true';
			const payload = {
				...rest,
				active: updatedActive,
			};
			const response = await updateBanner(payload);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		}
	};

	const fields: {
		name: keyof IFormData;
		label: string;
		type: 'text' | 'select';
		options?: { value: string; label: string }[];
	}[] = [
		{ name: 'title', label: 'Title', type: 'text' },
		{ name: 'description', label: 'Description', type: 'text' },
		{
			name: 'type',
			label: 'Type',
			type: 'select',
			options: [{ value: 'HOME_PAGE', label: 'HOME_PAGE' }],
		},
	];

	const renderField = (field: (typeof fields)[number]) => {
		if (field.type === 'select') {
			return (
				<FormField
					key={field.name}
					control={form.control}
					name={field.name}
					render={({ field: selectField, fieldState }) => {
						return (
							<FormItem>
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
										{field.options?.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
			);
		}

		return (
			<FormField
				key={field.name}
				control={form.control}
				name={field.name as keyof IFormData}
				render={({ field: inputField, fieldState }) => (
					<FormItem className="relative">
						<FormControl>
							<FloatingInput
								label={field.label}
								id={field.name}
								isError={!!fieldState.error}
								{...inputField}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		);
	};

	return (
		<div className="max-w-[720px]">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-24 grid grid-cols-2 gap-x-24 gap-y-24"
				>
					{fields.map(renderField)}
					{type === 'EDIT' && (
						<FormField
							control={form.control}
							name="active"
							render={({ field: selectField, fieldState }) => {
								return (
									<FormItem>
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
					)}
					<div className="col-span-2">
						<Button
							disabled={isPending || isLoading}
							loading={isPending || isLoading}
							loadingText={
								type === 'EDIT' ? 'Updating Banner...' : 'Creating Banner...'
							}
							type="submit"
							className="w-[240px] col-span-2"
						>
							{type === 'EDIT' ? 'Update' : 'Add'}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
