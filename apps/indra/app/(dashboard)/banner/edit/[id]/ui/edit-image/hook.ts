import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGetProductsByIds } from '../../../../../../../core/api';

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

export const useEditImageForm = (details: ICatalougeTypes.IBannerImage) => {
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

	const productIds = details?.productIds.join(',');
	const { data } = useGetProductsByIds(productIds);
	const [products, setProducts] = useState<ICatalougeTypes.IProduct[]>([]);

	useEffect(() => {
		if (details) {
			form.reset({
				title: details.title || '',
				description: details.description || '',
				xPriority: details.xPriority?.toString() || '',
				yPriority: details.yPriority?.toString() || '',
				active: details.active?.toString() || 'true',
			});
		}
	}, [details, form]);

	useEffect(() => {
		if (data && data?.data?.products.length > 0) {
			setProducts(data?.data?.products);
		}
	}, [data, data?.data?.products]);

	const handleProduct = (product: ICatalougeTypes.IProduct) => {
		setProducts((prev) => [...prev, product]);
	};

	const handleDelete = (id: string) => {
		setProducts((prev) => prev.filter((product) => product._id !== id));
	};

	return { form, products, handleProduct, handleDelete };
};
