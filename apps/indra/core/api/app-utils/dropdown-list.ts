import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../services';

const getDropdownList = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ dropdown: ICommonTypes.IDropdownItem[] }>
	>(`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}${_params}`);
	return data;
};

export function useGetDropdownList(key: string) {
	return useQuery({
		queryKey: ['app/utils/dropdown/', key],
		queryFn: getDropdownList,
		enabled: !!key,
	});
}
