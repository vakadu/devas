import { QueryFunctionContext, useQuery, keepPreviousData } from '@tanstack/react-query';

import { HttpService } from '../../services';

const getProductsList = async ({
	queryKey,
}: QueryFunctionContext<[string, string, number, 0 | 1, number]>) => {
	const [_key, searchTerm, limit, active, pageParam] = queryKey;

	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/product/list?page=${pageParam}&limit=${limit}`;

	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}
	if (active === 1) {
		url += `&active=1`;
	}

	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ products: ICatalougeTypes.IProduct[] }>
	>(url);

	return data;
};

export function useGetProductsList(
	searchTerm: string,
	apiKey: string,
	active: 0 | 1,
	page: number,
	limit: number
) {
	return useQuery({
		queryKey: [apiKey, searchTerm, limit, active, page],
		queryFn: getProductsList,
		placeholderData: keepPreviousData,
	});
}
