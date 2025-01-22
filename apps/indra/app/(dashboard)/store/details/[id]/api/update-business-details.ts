import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';

interface IPayload {
	ownerName?: string;
	businessContact?: number;
	entityName?: string;
	panNo?: string;
	gstNo?: string;
}

const updateBusinessDetails = async (payload: IPayload, id: string) => {
	try {
		const { data } = await HttpService.patch<ICommonTypes.IApiResponse<any>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/store/businessDetail/${id}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateBusinessDetails(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateBusinessDetails(payload, id),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('updated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
