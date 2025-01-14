import { useInfiniteQuery } from '@tanstack/react-query';

import { HttpService } from '../../services';

const getStoreProductList = async ({
	pageParam = 0,
	searchTerm,
	limit = 5,
	storeId,
}: {
	pageParam: number;
	searchTerm: string;
	limit: number;
	storeId: string;
}) => {
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/store/productList?page=${pageParam}&limit=${limit}`;
	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ storeProducts: ICatalougeTypes.IStoreProduct[] }>
	>(url);

	return {
		data,
		nextPage: data?.data?.storeProducts?.length < limit ? null : pageParam + 1,
	};
};

export function useGetStoreProductsList(searchTerm: string, limit: number, storeId: string) {
	return useInfiniteQuery({
		queryKey: ['store/productList', searchTerm, limit],
		queryFn: ({ pageParam }) => getStoreProductList({ pageParam, searchTerm, limit, storeId }),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.nextPage,
	});
}
