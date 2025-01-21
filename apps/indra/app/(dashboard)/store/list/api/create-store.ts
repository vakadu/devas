import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../core/services';

interface IPayload {
	mobile: number;
	name: string;
}

const createStore = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post<ICommonTypes.IApiResponse<any>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/user/addStore`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useCreateStore() {
	return useMutation({
		mutationFn: createStore,
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Store created successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
