'use server';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';

import { AppConstansts, Routes } from '../primitives';

export const authToken = async () => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get(AppConstansts.AccessToken)?.value as string;
	return jwtDecode(accessToken) as IAuthTypes.IAuthState;
};

export const logout = async () => {
	const cookieStore = await cookies();
	cookieStore.delete(AppConstansts.AccessToken);
	cookieStore.delete(AppConstansts.RefreshToken);
	redirect(Routes.Login);
};
