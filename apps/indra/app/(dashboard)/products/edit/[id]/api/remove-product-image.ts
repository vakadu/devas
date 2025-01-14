import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';

interface IPayload {
	productImageId: string;
}

const removeProductImage = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<
			ICommonTypes.IApiResponse<{ product: ICatalougeTypes.IProduct }>
		>(`${process.env.NEXT_PUBLIC_BASE_PATH}/product/removeImage/${id}`, payload);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useRemoveProductImage(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => removeProductImage(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Removed successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
