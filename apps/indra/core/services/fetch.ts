'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AppConstansts, Routes } from '../primitives';
import { logout } from './token';

export const withAuthFetch = async (url: string, options: any = {}) => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get(AppConstansts.AccessToken)?.value;
	const refreshToken = cookieStore.get(AppConstansts.RefreshToken)?.value;

	const response = await fetch(url, {
		headers: {
			...options.headers,
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
	});

	try {
		const data = await response.json();

		if (data?.statusCode === 401) {
			const refreshTokenData = await fetchRefreshToken(refreshToken as string);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
	}
};

const fetchRefreshToken = async (refreshToken: string) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				refreshToken: refreshToken,
			}),
		});
		const data = await response.json();
		if (data?.statusCode === 200) {
			console.log('logged');
		} else {
			console.log('here');

			const cookieStore = await cookies();
			cookieStore.delete(AppConstansts.AccessToken);
			cookieStore.delete(AppConstansts.RefreshToken);
			redirect(Routes.Login);
		}
	} catch (error) {
		console.log(error);
	}
};
