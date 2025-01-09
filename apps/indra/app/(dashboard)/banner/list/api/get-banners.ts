import { useInfiniteQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../core/services';

const getBanners = async ({
	pageParam = 0,
	searchTerm,
	limit = 5,
}: {
	pageParam: number;
	searchTerm: string;
	limit: number;
}) => {
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/banner/list?page=${pageParam}&limit=${limit}`;
	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ banners: ICatalougeTypes.IBanner[] }>
	>(url);

	return {
		data,
		nextPage: data?.data?.banners?.length < limit ? null : pageParam + 1,
	};
};

export function useGetBanners(searchTerm: string, limit: number) {
	return useInfiniteQuery({
		queryKey: ['banner/list', searchTerm, limit],
		queryFn: ({ pageParam }) => getBanners({ pageParam, searchTerm, limit }),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.nextPage,
	});
}
