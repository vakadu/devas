import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Form } from '@devas/ui';
import { FieldRenderer } from './field-renderer';
import { useUpdateBannerImageAttributes } from '../../api/update-banner-image-attributes';
import { PlusIcon } from 'lucide-react';

type IFormData = {
	title: string;
	description: string;
	xPriority: string;
	yPriority: string;
	active: string;
};

const schema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	description: z.string().min(5, { message: 'Description is required' }),
	xPriority: z.string().min(1, { message: 'xPriority is required' }),
	yPriority: z.string().min(1, { message: 'yPriority is required' }),
	active: z.string().min(1, { message: 'Type is required' }),
});

export default function EditImageDetails({
	image,
	refetch,
	setShowForm,
}: {
	image: ICatalougeTypes.IBannerImage;
	refetch: () => void;
	setShowForm: (show: boolean) => void;
}) {
	const params = useParams();
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: image.title || '',
			description: image.description || '',
			xPriority: image.xPriority?.toString() || '',
			yPriority: image.yPriority?.toString() || '',
			active: image.active?.toString() || 'true',
		},
	});
	const { mutateAsync: updateBannerImageAttributes, isPending } = useUpdateBannerImageAttributes(
		params?.id as string
	);

	const fields = useMemo(
		() => [
			{ name: 'title', label: 'Title' },
			{ name: 'description', label: 'Description', type: 'textarea' },
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

	useEffect(() => {
		if (image) {
			form.reset({
				title: image.title || '',
				description: image.description || '',
				xPriority: image.xPriority?.toString() || '',
				yPriority: image.yPriority?.toString() || '',
				active: image.active?.toString() || 'true',
			});
		}
	}, [form, image]);

	const handleProducts = () => {
		// setShowDialog(true);
	};

	const onSubmit = async (values: IFormData) => {
		const payload = {
			...values,
			xPriority: Number(values.xPriority),
			yPriority: Number(values.yPriority),
			active: values.active === 'true',
			bannerImageId: image?._id as string,
		};
		const response = await updateBannerImageAttributes(payload);
		if (response.status === 'SUCCESS') {
			refetch();
			setShowForm(false);
		}
	};

	return (
		<div className="w-full">
			<div className="flex justify-between items-center border-b border-grey-light p-16 mb-24">
				<h2 className="font-medium">Update Banner Details</h2>
				<div
					onClick={handleProducts}
					className="border-2 border-grey-light w-24 h-24 rounded-full flex justify-center items-center cursor-pointer"
				>
					<div className="w-16 h-16 bg-primary rounded-full  flex justify-center items-center">
						<PlusIcon className="size-14 text-white font-bold" />
					</div>
				</div>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col justify-between w-full p-16"
				>
					<FieldRenderer fields={fields} form={form} />
					<Button
						loading={isPending}
						disabled={isPending}
						className="max-w-[240px] mt-24"
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
