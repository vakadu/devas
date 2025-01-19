import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../../../core/services';

const getBannerProducts = async ({ queryKey }: QueryFunctionContext<[string, string, string]>) => {
	const [_key, bannerId, imageId] = queryKey;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ image: ICatalougeTypes.IBannerImage }>
	>(`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${bannerId}/${imageId}`);
	return data;
};

export function useGetBannerImagesProducts(bannerId: string, imageId: string) {
	return useQuery({
		queryKey: ['banner/image', bannerId, imageId],
		queryFn: getBannerProducts,
		enabled: !!bannerId,
	});
}
