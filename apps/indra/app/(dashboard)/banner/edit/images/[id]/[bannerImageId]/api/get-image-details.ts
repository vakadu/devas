import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../../../../core/services';

const getBannerImageDetails = async ({
	queryKey,
}: QueryFunctionContext<[string, string, string]>) => {
	const [_key, id, bannerImageId] = queryKey;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ image: ICatalougeTypes.IBannerImage }>
	>(`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${id}/${bannerImageId}`);

	return data;
};

export function useGetBannerImageDetails(id: string, bannerImageId: string) {
	return useQuery({
		queryKey: ['banner/image', id, bannerImageId],
		queryFn: getBannerImageDetails,
		enabled: !!id,
	});
}
