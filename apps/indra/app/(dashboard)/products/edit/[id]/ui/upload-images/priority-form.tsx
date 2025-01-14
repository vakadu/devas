import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Button,
	FormControl,
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Select,
} from '@devas/ui';
import { useUpdateImageAttributes } from '../../api/update-image-attributes';

type IFormData = {
	priority: string;
	active: string;
};

const schema = z.object({
	priority: z.string().min(1, { message: 'Priority is required' }),
	active: z.string().min(1, { message: 'Type is required' }),
});

export default function PriorityUpdateForm({
	image,
	id,
	refetch,
}: {
	image: ICatalougeTypes.IProductImage;
	id: string;
	refetch: () => void;
}) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			priority: image?.priority?.toString() || '',
			active: image?.active?.toString() || 'true',
		},
	});
	const { mutateAsync: updateImageAttributes, isPending } = useUpdateImageAttributes(id);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			productImageId: image._id,
			active: values.active === 'true',
			priority: Number(values.priority),
		};
		const response = await updateImageAttributes(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	return (
		<div className="flex flex-col gap-12 max-w-[720px] mt-24 border border-grey-light p-16 rounded-12">
			<h2>Update Priority</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-24 grid grid-cols-2 gap-24 justify-between"
				>
					<FormField
						control={form.control}
						name="priority"
						render={({ field: selectField, fieldState }) => (
							<FormItem className="col-span-1">
								<FormLabel>Priority</FormLabel>
								<Select
									onValueChange={selectField.onChange}
									value={selectField.value}
								>
									<FormControl>
										<SelectTrigger
											isError={!!fieldState.error}
											className="!mt-6 bg-white"
										>
											<SelectValue placeholder="Select Priority" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{Array.from({ length: 6 }, (_, index) => {
											return (
												<SelectItem value={`${index + 1}`} key={index}>
													{index + 1}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="active"
						render={({ field: selectField, fieldState }) => (
							<FormItem className="col-span-1">
								<FormLabel>Active</FormLabel>
								<Select
									onValueChange={selectField.onChange}
									value={selectField.value}
								>
									<FormControl>
										<SelectTrigger
											isError={!!fieldState.error}
											className="!mt-6 bg-white"
										>
											<SelectValue placeholder="Select Status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="true">Active</SelectItem>
										<SelectItem value="false">InActive</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						className="max-w-[240px]"
						loading={isPending}
						loadingText="Updating..."
						disabled={isPending}
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
