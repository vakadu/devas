import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';

const uploadStoreDocs = async (payload: FormData, id: string) => {
	try {
		const { data } = await HttpService.patch<ICommonTypes.IApiResponse<any>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/store/uploadDocument/${id}`,
			payload,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					'cache-control': 'no-cache',
				},
			}
		);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useUploadStoreDocs(id: string) {
	return useMutation({
		mutationFn: (payload: FormData) => uploadStoreDocs(payload, id),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				toast.success('Image uploaded!');
			} else {
				toast.error('Unable to upload');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
