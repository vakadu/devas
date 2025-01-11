import { useMemo } from 'react';

import { useUpdateBannerImageAttributes } from '../../api/update-banner-image-attributes';
import { useEditImageForm } from './hook';
import { Button, Form, SheetClose, SheetFooter } from '@devas/ui';
import { FieldRenderer } from './field-renderer';

interface IEditImageProps {
	details: ICatalougeTypes.IBannerImage;
	id: string;
	setUpdateDetails: (type: boolean) => void;
	refetch: () => void;
}

type IFormData = {
	title: string;
	description: string;
	xPriority: string;
	yPriority: string;
	active: string;
};

export default function EditImage({ details, id, setUpdateDetails, refetch }: IEditImageProps) {
	const { form, products, handleProduct, handleDelete } = useEditImageForm(details);
	const { mutateAsync: updateBannerImageAttributes, isPending } =
		useUpdateBannerImageAttributes(id);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			...values,
			xPriority: Number(values.xPriority),
			yPriority: Number(values.yPriority),
			active: values.active === 'true',
			bannerImageId: details._id,
			productIds: products.map((product) => product.productId),
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
			{ name: 'productIds', label: 'ProductIds', type: 'selectList' },
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
		<div className="h-[calc(100%-80px)]">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-24 h-full flex flex-col justify-between"
				>
					<FieldRenderer
						fields={fields}
						form={form}
						products={products}
						handleProduct={handleProduct}
						handleDelete={handleDelete}
					/>
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
