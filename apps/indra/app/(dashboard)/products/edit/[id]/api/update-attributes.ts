import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';
import { ApiEndpoints } from '../../../../../../core/primitives';

interface IPayload {
	key: string;
	value: string;
	attributeKey: string;
	id: string;
}

const updateProductAttribute = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<
			ICommonTypes.IApiResponse<{ product: ICatalougeTypes.IProduct }>
		>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UpdateProductAttribute}/${id}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateProductAttribute(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateProductAttribute(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Attribute created successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUpdateProductAttribute;
