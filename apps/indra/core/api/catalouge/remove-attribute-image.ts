import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../services';

interface IPayload {
	productImageId: string;
}

const updateImageAttribute = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<
			ICommonTypes.IApiResponse<{ product: ICatalougeTypes.IProduct }>
		>(`${process.env.NEXT_PUBLIC_BASE_PATH}/product/removeImage/${id}`, payload);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useRemoveAttributeImage(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateImageAttribute(id, payload),
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

export default useRemoveAttributeImage;
