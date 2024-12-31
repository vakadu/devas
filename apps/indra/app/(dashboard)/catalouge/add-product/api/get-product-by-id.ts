import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../core/services';

const getProductList = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ products: ICatalougeTypes.IProduct[] }>
	>(`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`);
	return data;
};

export function useGetProductsList(id: string) {
	return useQuery({
		queryKey: ['product/byId', id],
		queryFn: getProductList,
	});
}
