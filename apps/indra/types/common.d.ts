declare namespace ICommonTypes {
	interface IApiResponse<T> {
		status: 'success' | 'error';
		msg: string;
		data: T;
		statusCode: 200 | 201 | 401;
		totalProducts?: number;
	}
	interface ILoginResponse {
		status: string;
		msg: string;
		login_data: {
			seller_id: number | null;
			store_category: string | null;
			store_type: string | null;
			credit_payment: boolean | null;
			cod_payment: boolean | null;
			pad_payment: boolean | null;
			username: string;
			user_id: number;
			name: string;
			thumbnail: string | null;
			is_active: number;
			login_flag: number;
			zone: string | null;
			indifi_id: string | null;
			email: string;
			phone_number: number;
			role: string;
			active: boolean | null;
			district_id: number | null;
			pincode: number | null;
			tnc: boolean | null;
		};
		token: {
			accessToken: string;
			refreshToken: string;
		};
		isNewUser: boolean;
	}
}
