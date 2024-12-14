'use server';

import { z } from 'zod';

import { actionClient } from '../utils';
import { prisma } from '../../helpers';

const schema = z.object({
	email: z.string().email('Please enter a valid email address'),
});

const comingSoon = actionClient.schema(schema).action(async ({ parsedInput }) => {
	const { email } = parsedInput;

	try {
		await prisma.coming_soon.create({
			data: {
				email,
			},
		});
		return {
			status: 200,
			msg: 'Email successfully saved',
		};
	} catch (error) {
		console.error(error);
		throw new Error('Failed to save email. Please try again.');
	}
});

export { comingSoon };
