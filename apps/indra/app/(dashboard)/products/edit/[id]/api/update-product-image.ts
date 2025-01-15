import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';

const updateProductImage = async (id: string, payload: FormData) => {
	try {
		const { data } = await HttpService.patch<ICommonTypes.IApiResponse<{ product: object }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/product/changeImage/${id}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateProductImage(id: string) {
	return useMutation({
		mutationFn: (payload: FormData) => updateProductImage(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('image attributes updated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
