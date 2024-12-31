import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../core/services';

const getProductList = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ products: ICatalougeTypes.IProduct[] }>
	>(`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}`);
	return data;
};

export function useGetProductsList() {
	return useQuery({
		queryKey: ['product/list'],
		queryFn: getProductList,
	});
}
