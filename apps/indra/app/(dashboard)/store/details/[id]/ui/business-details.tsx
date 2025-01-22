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
import { gstValidator, panValidator, phoneValidator } from '@devas/utils';
import { useGetStoreDetails } from '../api/get-store-details';
import { useUpdateBusinessDetails } from '../api/update-business-details';

const schema = z.object({
	businessContact: z
		.string()
		.min(10, { message: 'Mobile number must be at least 10 digits' })
		.max(15, { message: 'Mobile number cannot exceed 15 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' })
		.optional(),
	ownerName: z
		.string()
		.min(3, { message: 'Owner Name is required and must have at least 3 characters' })
		.optional(),
	entityName: z
		.string()
		.min(3, { message: 'Entity Name is required and must have at least 3 characters' })
		.optional(),
	gstNo: z
		.string()
		.min(3, { message: 'Entity Name is required and must have at least 3 characters' })
		.regex(gstValidator, { message: 'GST is not valid' })
		.optional(),
	panNo: z
		.string()
		.min(3, { message: 'Entity Name is required and must have at least 3 characters' })
		.regex(panValidator, { message: 'PAN is not valid' })
		.optional(),
});

type IFormData = z.infer<typeof schema>;

export default function BusinessDetails({ id }: { id: string }) {
	const { data, refetch, isPending } = useGetStoreDetails(id);
	const details = data?.data?.store || ({} as IStoreTypes.IStoreDetails);
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			businessContact: details?.businessContact?.toString() ?? undefined,
			ownerName: details?.ownerName ?? undefined,
			entityName: details?.entityName ?? undefined,
			panNo: details?.panNo ?? undefined,
			gstNo: details?.gstNo ?? undefined,
		},
	});
	const { mutateAsync: updateBusinessDetails } = useUpdateBusinessDetails(id);

	useEffect(() => {
		if (data?.data?.store) {
			form.reset({
				ownerName: details?.ownerName,
				businessContact: details?.businessContact?.toString(),
				entityName: details?.entityName,
				panNo: details?.panNo,
				gstNo: details?.gstNo,
			});
		}
	}, [
		data?.data?.store,
		details?.businessContact,
		details?.entityName,
		details?.gstNo,
		details?.ownerName,
		details?.panNo,
		form,
	]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			...values,
			businessContact: Number(values.businessContact),
		};
		const response = await updateBusinessDetails(payload);
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
					name="ownerName"
					render={({ field, fieldState }) => (
						<FormItem className="col-span-1">
							<FormControl>
								<FloatingInput
									label="Owner Name"
									id="ownerName"
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
					name="businessContact"
					render={({ field, fieldState }) => (
						<FormItem className="col-span-1">
							<FormControl>
								<FloatingInput
									label="Business Contact"
									id="businessContact"
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
					name="entityName"
					render={({ field, fieldState }) => (
						<FormItem className="col-span-1">
							<FormControl>
								<FloatingInput
									label="Entity Name"
									id="entityName"
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
					name="gstNo"
					render={({ field, fieldState }) => (
						<FormItem className="col-span-1">
							<FormControl>
								<FloatingInput
									label="GST Number"
									id="gstNo"
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
					name="panNo"
					render={({ field, fieldState }) => (
						<FormItem className="col-span-1">
							<FormControl>
								<FloatingInput
									label="PAN Number"
									id="panNo"
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
