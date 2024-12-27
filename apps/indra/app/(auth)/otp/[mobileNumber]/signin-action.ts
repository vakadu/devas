'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';

import { ApiEndpoints, AppConstansts } from '../../../../core/primitives';
import { safeActionClient } from '../../../../core/services';
import { otpValidator, phoneValidator } from '@devas/utils';

const schema = z.object({
	mobileNumber: z
		.string()
		.min(10, { message: 'Mobile number should have minimum 10 digits' })
		.max(10, { message: 'Mobile number cant be more than 10 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
	otp: z
		.string()
		.min(6, { message: 'Otp should have minimum 6 digits' })
		.max(6, { message: 'Otp cant be more than 6 digits' })
		.regex(otpValidator, { message: 'OTP is not valid' }),
});

const signinAction = safeActionClient.schema(schema).action(async ({ parsedInput }) => {
	const { mobileNumber, otp } = parsedInput;
	const cookieStore = await cookies();

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.SignIn}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ mobile: Number(mobileNumber), otp: Number(otp) }),
			}
		);
		if (!response.ok) {
			return {
				status: 'ERROR',
				msg: 'Unable to verify OTP. Please try again.',
				data: null,
				statusCode: response.status,
			} as ICommonTypes.IApiResponse<null>;
		}
		const otpData =
			(await response.json()) as ICommonTypes.IApiResponse<IAuthTypes.ILoginInterface>;
		if (otpData.status === 'SUCCESS') {
			cookieStore.set({
				name: AppConstansts.AccessToken,
				value: otpData?.data?.accessToken,
				httpOnly: true,
				secure: true,
			});
			cookieStore.set({
				name: AppConstansts.RefreshToken,
				value: otpData?.data?.refreshToken,
				httpOnly: true,
				secure: true,
			});
			return {
				status: 'SUCCESS',
				msg: '',
				data: null,
				statusCode: response.status,
			} as ICommonTypes.IApiResponse<null>;
		} else {
			return {
				status: 'ERROR',
				msg: 'Unable to signin. Please try again.',
				data: null,
				statusCode: response.status,
			} as ICommonTypes.IApiResponse<null>;
		}
	} catch (err) {
		return {
			status: 'ERROR',
			msg: 'A network error occurred. Please check your connection and try again.',
			data: null,
			statusCode: 500,
		} as ICommonTypes.IApiResponse<null>;
	}
});

export { signinAction };
