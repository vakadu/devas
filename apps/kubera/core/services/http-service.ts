import axios, { AxiosResponse, AxiosError } from 'axios';

import { store } from '../store';
import { ResetTokenAndReattemptRequest } from './reattempt-token';
import { logout } from '../helpers';

// Interface for the error response data
interface AxiosErrorResponseData {
	status: string;
	msg: string;
	statusCode: number;
}

// Custom Axios error interface
interface CustomAxiosError extends AxiosError {
	response?: AxiosResponse<AxiosErrorResponseData>;
}

// Create an instance of axios
export const HttpService = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_PATH,
});

HttpService.interceptors.request.use(
	async (config) => {
		try {
			const state = store.getState() as any;
			if (state?.auth?.loggedIn && state?.auth?.accessToken) {
				config.headers.Authorization = `Bearer ${state.auth.accessToken}`;
			}
			return config;
		} catch (error) {
			return Promise.reject(error);
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

HttpService.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	async (error: CustomAxiosError) => {
		if (error.response) {
			// Handle specific error responses
			if (
				error.response.data?.statusCode === 401 &&
				error.response.data?.msg === 'jwt expired'
			) {
				return ResetTokenAndReattemptRequest(error.response);
			} else if (error.response.data?.msg === 'Inactive user!') {
				logout();
			}
		} else if (error.request) {
			// Handle errors that occur during the request but no response was received
		} else {
			// Handle other types of errors (e.g., configuration issues)
		}

		return Promise.reject(error);
	}
);
