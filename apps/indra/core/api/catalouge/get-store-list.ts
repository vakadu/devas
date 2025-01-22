import { keepPreviousData, QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../services';

const getStoresList = async ({
	queryKey,
}: QueryFunctionContext<[string, string, number, 0 | 1, number]>) => {
	const [_key, searchTerm, limit, active, pageParam] = queryKey;

	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/store/list?page=${pageParam}&limit=${limit}`;
	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ stores: ICatalougeTypes.IStore[] }>
	>(url);
	return data;
};

export function useGetStoresList(
	searchTerm: string,
	apiKey: string,
	active: 0 | 1,
	page: number,
	limit: number
) {
	return useQuery({
		queryKey: [apiKey, searchTerm, limit, active, page],
		queryFn: getStoresList,
		placeholderData: keepPreviousData,
	});
}
