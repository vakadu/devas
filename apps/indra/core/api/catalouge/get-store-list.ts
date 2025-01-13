import { useInfiniteQuery } from '@tanstack/react-query';

import { HttpService } from '../../services';

const getStoresList = async ({
	pageParam = 0,
	searchTerm,
	limit = 5,
}: {
	pageParam: number;
	searchTerm: string;
	limit: number;
}) => {
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/user/storeList?page=${pageParam}&limit=${limit}`;
	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ stores: ICatalougeTypes.IStore[] }>
	>(url);

	return {
		data,
		nextPage: data?.data?.stores?.length < limit ? null : pageParam + 1,
	};
};

export function useGetStoresList(searchTerm: string, limit: number) {
	return useInfiniteQuery({
		queryKey: ['user/storeList', searchTerm, limit],
		queryFn: ({ pageParam }) => getStoresList({ pageParam, searchTerm, limit }),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.nextPage,
	});
}
