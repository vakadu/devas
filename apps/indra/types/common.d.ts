declare namespace ICommonTypes {
	interface IApiResponse<T> {
		status: 'SUCCESS' | 'ERROR';
		msg: string;
		data: T;
		statusCode: 200 | 201 | 401 | 500;
	}
}
