import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';
import { ApiEndpoints } from '../../../../../../core/primitives';

interface IPayload {
	productImageId: string;
	active: boolean;
	priority: number;
}

const updateImageAttributes = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<ICommonTypes.IApiResponse<{ product: object }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/product/updateImageAttribute/${id}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateImageAttributes(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateImageAttributes(id, payload),
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
