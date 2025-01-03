import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';
import { ApiEndpoints } from '../../../../../../core/primitives';

const uploadProductImage = async (payload: FormData, id: string) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UploadProductImage}/${id}`,
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

export function useUploadProductImage(id: string) {
	return useMutation({
		mutationFn: (payload: FormData) => uploadProductImage(payload, id),
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

export default useUploadProductImage;
