'use server';

import axios from 'axios';
import { z } from 'zod';

import { API_ENDPOINTS } from '@agni/helpers/api-endpoints';
import { otpValidator } from '@devas/utils';
import { LoginPayload } from '../schema';

const schema = z.object({
	otp: z
		.string()
		.length(6, 'OTP must be exactly 6 digits')
		.regex(otpValidator, 'OTP is not valid'),
});

const userLogin = async (prevState: any, formData: FormData) => {
	try {
		const mobileNumber = formData.get('mobileNumber')?.toString();
		const otp = formData.get('otp')?.toString();
		const otpValidation = schema.parse({ otp });
		const payload = {
			username: mobileNumber,
			isWO: 1,
			isNewUser: false,
			otp: otpValidation.otp,
		} as LoginPayload;
		const { data } = await axios.post(
			`${process.env.BASE_PATH}/${API_ENDPOINTS.LOGIN}`,
			payload
		);
		if (data?.status === 'error') {
			return { error: data?.msg };
		} else {
			return data;
		}
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { error: error.errors[0].message };
		}
		console.log(error);

		return { error: 'Something went wrong. Please try again later.' };
	}
};

export { userLogin };
