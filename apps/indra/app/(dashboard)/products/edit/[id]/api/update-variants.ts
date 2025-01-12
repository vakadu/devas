import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';
import { ApiEndpoints } from '../../../../../../core/primitives';

interface IPayload {
	productVariantIds: string[];
}

const updateProductVariants = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<ICommonTypes.IApiResponse<{ product: object }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/product/addVariants
/${id}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateProductVariants(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateProductVariants(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Product variant updated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
