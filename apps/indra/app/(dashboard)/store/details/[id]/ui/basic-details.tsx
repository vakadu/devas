import { useEffect } from 'react';
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
	Spinner,
} from '@devas/ui';
import { phoneValidator } from '@devas/utils';
import { useUpdateBasicDetails } from '../api/update-basic-detail';
import { useGetStoreDetails } from '../api/get-store-details';

const schema = z.object({
	mobile: z
		.string()
		.min(10, { message: 'Mobile number must be at least 10 digits' })
		.max(15, { message: 'Mobile number cannot exceed 15 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
	name: z.string().min(3, { message: 'Name is required and must have at least 3 characters' }),
	email: z.string().email({ message: 'Invalid email address' }).optional(),
});

type IFormData = z.infer<typeof schema>;

export default function BasicDetails({ id }: { id: string }) {
	const { data, refetch, isPending } = useGetStoreDetails(id);
	const details = data?.data?.store || ({} as IStoreTypes.IStoreDetails);
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			mobile: details?.mobile || '',
			name: details?.name || '',
			email: details?.email ?? undefined,
		},
	});
	const { mutateAsync: updateBasicDetails } = useUpdateBasicDetails(id);

	useEffect(() => {
		if (data?.data?.store) {
			form.reset({
				name: details?.name,
				mobile: details?.mobile,
				email: details?.email,
			});
		}
	}, [data?.data?.store, details?.email, details?.mobile, details?.name, form]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			...values,
			mobile: Number(values.mobile),
		};
		const response = await updateBasicDetails(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	if (isPending) {
		return <Spinner />;
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="gap-x-24 gap-y-24 bg-white rounded-12 px-12 py-24 max-w-[720px] grid grid-cols-2 gap-24 shadow-card1"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field, fieldState }) => (
						<FormItem className="col-span-1">
							<FormControl>
								<FloatingInput
									label="Name"
									id="name"
									isError={!!fieldState.error}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="mobile"
					render={({ field, fieldState }) => (
						<FormItem className="col-span-1">
							<FormControl>
								<FloatingInput
									label="Mobile Number"
									id="mobile"
									isError={!!fieldState.error}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field, fieldState }) => (
						<FormItem className="col-span-1">
							<FormControl>
								<FloatingInput
									label="Email"
									id="email"
									isError={!!fieldState.error}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="col-span-2 max-w-[180px]">Submit</Button>
			</form>
		</Form>
	);
}
