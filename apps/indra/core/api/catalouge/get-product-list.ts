import { useInfiniteQuery } from '@tanstack/react-query';

import { HttpService } from '../../services';

const getProductList = async ({
	pageParam = 0,
	searchTerm,
	limit = 5,
	active = 1,
}: {
	pageParam: number;
	searchTerm: string;
	limit: number;
	active?: 0 | 1;
}) => {
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/product/list?page=${pageParam}&limit=${limit}&active=${active}`;
	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ products: ICatalougeTypes.IProduct[] }>
	>(url);

	return {
		data,
		nextPage: data?.data?.products?.length < limit ? null : pageParam + 1,
	};
};

export function useGetProductsList(searchTerm: string, limit: number, active?: 0 | 1) {
	return useInfiniteQuery({
		queryKey: ['product/list', searchTerm, limit],
		queryFn: ({ pageParam }) => getProductList({ pageParam, searchTerm, limit, active }),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.nextPage,
	});
}
