import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';

interface IPayload {
	quantity: number;
	price: number;
	discount: number;
}

const updateStoreProduct = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<
			ICommonTypes.IApiResponse<{ storeProduct: ICatalougeTypes.IStoreProducts }>
		>(`${process.env.NEXT_PUBLIC_BASE_PATH}/store/updateProduct/${id}`, payload);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateStoreProduct(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateStoreProduct(id, payload),
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
