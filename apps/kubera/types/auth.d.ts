declare namespace IAuthTypes {
	interface IsUserRegisteredInterface {
		isUser: boolean;
		role: string;
	}
	interface ILoginOtpApiResponse {
		type: string;
	}
	interface ILoginInterface {
		accessToken: string;
		refreshToken: string;
	}
	interface ISignupFormData {
		mobile: number;
		otp: number;
		name: string;
		role: string;
	}
	interface ISigninFormData {
		mobile: number;
		otp: number;
	}
	type ISubscription = 'BASIC' | 'ADVANCE' | 'PREMIUM';
	type IAuthState = {
		loading: boolean;
		loggedIn: boolean;
		token: null | string;
		refreshToken: null | string;
		userId?: null | string;
		mobile?: null | string;
		name?: string;
		active?: boolean;
		gender?: string;
		role?: null | string;
		clinicIds?: string[];
		createdAt?: string;
		updatedAt?: string;
		iat?: number;
		exp?: number;
		subscription?: null | IAuthTypes.ISubscription;
	};
}
