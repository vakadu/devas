'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import { useEffect } from 'react';

import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@devas/ui';
import { comingSoon } from '../../../actions/coming-soon';

const schema = z.object({
	email: z.string().email('Please enter a valid email address'),
});

export default function Subscribe() {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
		},
	});
	const { execute, result, isExecuting } = useAction(comingSoon);

	useEffect(() => {
		if (!result) return;

		if (result?.data?.status === 200) {
			toast.success(result?.data?.msg);
			form?.reset();
		}

		if (result.serverError) {
			toast.error(result.serverError);
		}
	}, [form, result, result.data]);

	useEffect(() => {
		if (!result.serverError) return;
		if (result.serverError) {
			toast.error(result.serverError);
		}
	}, [result.serverError]);

	const onSubmit = async (values: { email: string }) => {
		const payload = {
			email: values.email,
		};
		execute(payload);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex justify-center items-center gap-24"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="w-[350px] flex flex-col items-start relative">
							<FormControl>
								<Input
									type="email"
									id="email"
									placeholder="Email Address"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute bottom-[-24px]" />
						</FormItem>
					)}
				/>
				<Button
					disabled={isExecuting}
					loading={isExecuting}
					loadingText="Submitting..."
					variant="ghost"
					className="h-[48px] border-2 px-24"
				>
					Subscribe
				</Button>
			</form>
		</Form>
	);
}