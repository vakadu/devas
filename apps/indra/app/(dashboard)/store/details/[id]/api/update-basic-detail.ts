import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';

interface IPayload {
	name: string;
	mobile: number;
	email?: string;
}

const updateBasicDetails = async (payload: IPayload, id: string) => {
	try {
		const { data } = await HttpService.patch<ICommonTypes.IApiResponse<any>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/store/basicDetail/${id}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateBasicDetails(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateBasicDetails(payload, id),
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
