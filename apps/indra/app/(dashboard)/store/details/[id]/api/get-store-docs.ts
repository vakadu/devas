import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../../core/services';

const getStoreDocs = async ({ queryKey }: QueryFunctionContext<[string, string, string]>) => {
	const [_key, storeId, type] = queryKey;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ docUrl: string; type: string }>
	>(`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${storeId}/${type}`);
	return data;
};

export function useGetStoreDocs(
	storeId: string,
	type: string,
	isValue: string | undefined,
	otherCheck: boolean
) {
	return useQuery({
		queryKey: ['store/downloadDocument', storeId, type],
		queryFn: getStoreDocs,
		enabled: !!isValue && otherCheck,
	});
}
