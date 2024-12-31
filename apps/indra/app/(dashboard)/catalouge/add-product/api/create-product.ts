import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../core/services';
import { ApiEndpoints } from '../../../../../core/primitives';

interface IPayload {
	title: string;
	description: string;
	quantity: number;
	packQuantity: number;
	mrp: number;
	price: number;
	gstInPercent: number;
	hsn: string;
	brand: string;
	category: string;
	subcategory: string;
	colour?: string;
	size?: string;
}

const createProduct = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post<ICommonTypes.IApiResponse<{ product: object }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.CreateProduct}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useCreateProduct() {
	return useMutation({
		mutationFn: createProduct,
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Product created successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useCreateProduct;
