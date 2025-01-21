'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@devas/ui';
import { useStoreListingContext } from '../../../../../core/ui/listing/context';
import { phoneValidator } from '@devas/utils';
import { useCreateStore } from '../api/create-store';

const schema = z.object({
	mobile: z
		.string()
		.min(10, { message: 'Mobile number should have minimum 10 digits' })
		.max(10, { message: 'Mobile number cant be more than 10 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
	name: z.string().min(3, { message: 'Store name is required' }),
});

type IFormData = z.infer<typeof schema>;

export function AddEditStore({ setShow }: { setShow: (s: boolean) => void }) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			mobile: '',
			name: '',
		},
	});
	const { refetch } = useStoreListingContext();
	const { mutateAsync: createStore, isPending } = useCreateStore();

	const onSubmit = async (values: IFormData) => {
		const payload = {
			mobile: Number(values.mobile),
			name: values.name,
		};
		const response = await createStore(payload);
		if (response.status === 'SUCCESS') {
			refetch();
			form.reset();
			setShow(false);
		}
	};

	return (
		<div className="col-span-2 bg-white rounded-8 pb-[72px]">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-24 grid grid-cols-3 gap-x-24 gap-y-24"
				>
					<FormField
						control={form.control}
						name="mobile"
						render={({ field: inputField, fieldState }) => (
							<FormItem className="relative col-span-1">
								<FormControl>
									<FloatingInput
										label="Mobile Number"
										id="mobile"
										isError={!!fieldState.error}
										{...inputField}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field: inputField, fieldState }) => (
							<FormItem className="relative col-span-1">
								<FormControl>
									<FloatingInput
										label="Store Name"
										id="name"
										isError={!!fieldState.error}
										{...inputField}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} loading={isPending} className="max-w-[180px]">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
