import { useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Form } from '@devas/ui';
import { FieldRenderer } from './field-renderer';
import { useGetBannerImageDetails } from '../api/get-image-details';
import { useUpdateBannerImageAttributes } from '../api/update-banner-image-attributes';

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
	handleChange,
}: {
	handleChange: (type: string) => void;
}) {
	const params = useParams();
	const searchParams = useSearchParams();
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: '',
			description: '',
			xPriority: '',
			yPriority: '',
			active: 'false',
		},
	});
	const { data, refetch } = useGetBannerImageDetails(
		params?.id as string,
		params?.bannerImageId as string
	);
	const bannerImageDetails = data?.data?.image || ({} as ICatalougeTypes.IBannerImage);
	const { mutateAsync: updateBannerImageAttributes, isPending } = useUpdateBannerImageAttributes(
		params?.id as string
	);
	const productIds = searchParams.get('products')?.split(',') || [];

	useEffect(() => {
		if (data?.data?.image) {
			form.reset({
				title: bannerImageDetails.title || '',
				description: bannerImageDetails.description || '',
				xPriority: bannerImageDetails.xPriority?.toString() || '',
				yPriority: bannerImageDetails.yPriority?.toString() || '',
				active: bannerImageDetails.active?.toString() || 'true',
			});
		}
	}, [
		bannerImageDetails.active,
		bannerImageDetails.description,
		bannerImageDetails.title,
		bannerImageDetails.xPriority,
		bannerImageDetails.yPriority,
		data?.data?.image,
		form,
	]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			...values,
			xPriority: Number(values.xPriority),
			yPriority: Number(values.yPriority),
			active: values.active === 'true',
			bannerImageId: params?.bannerImageId as string,
			productIds,
		};
		const response = await updateBannerImageAttributes(payload);
		if (response.status === 'SUCCESS') {
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
		<div className="max-w-[720px]">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-24 h-full flex flex-col justify-between"
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
