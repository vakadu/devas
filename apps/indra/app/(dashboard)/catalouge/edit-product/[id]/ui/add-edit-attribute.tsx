import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Button,
	FloatingInput,
	FloatingTextArea,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@devas/ui';
import { useCreateProductAttribute, useUpdateProductAttribute } from '../api';
import { useEditProduct } from '../context';
import { useEffect } from 'react';

const schema = z.object({
	key: z.string().min(3, { message: 'Title is required' }),
	value: z.string().min(6, { message: 'Description is required' }),
});

type IFormData = z.infer<typeof schema>;

export default function AttributeForm({ id, refetch }: { id: string; refetch: () => void }) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			key: '',
			value: '',
		},
	});
	const { mutateAsync: createProductAttribute, isPending } = useCreateProductAttribute(id);
	const { mutateAsync: updateProductAttribute, isPending: isLoading } =
		useUpdateProductAttribute(id);
	const { attributeKey, attribute, attributeName, type, toggleForm, setType } = useEditProduct();

	useEffect(() => {
		if (type === 'EDIT') {
			form.setValue('key', attribute?.key || '');
			form.setValue('value', attribute?.value || '');
		}
	}, [attribute?.key, attribute?.value, form, type]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			key: values.key,
			value: values.value,
			attributeKey: attributeKey as string,
		};
		if (type === 'ADD') {
			const response = await createProductAttribute(payload);
			if (response.status === 'SUCCESS') {
				form.reset();
				refetch();
			}
		} else {
			const newPayload = {
				...payload,
				id: attribute?._id as string,
			};
			const response = await updateProductAttribute(newPayload);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		}
		toggleForm(false);
		setType(null);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="gap-x-24 gap-y-24">
				<div className="text-18 mb-16">Editing attributes for {attributeName}</div>
				<FormField
					control={form.control}
					name="key"
					render={({ field, fieldState }) => (
						<FormItem className="relative mb-24">
							<FormControl>
								<FloatingInput
									label="Key"
									id="key"
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
					name="value"
					render={({ field, fieldState }) => (
						<FormItem className="relative mb-24">
							<FormControl>
								<FloatingTextArea
									label="Value"
									id="value"
									isError={!!fieldState.error}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={isLoading || isPending}
					loading={isLoading || isPending}
					loadingText={isLoading ? 'Updating...' : 'Submitting...'}
					className="w-full"
				>
					{type === 'ADD' ? 'Submit' : 'Update'}
				</Button>
			</form>
		</Form>
	);
}
