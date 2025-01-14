import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	DropZone,
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@devas/ui';
import { createFormDataForImage } from '../../../../../../../core/helpers';
import { useCreateProductImage } from '../../api/create-product-image';

const schema = z.object({
	type: z.string().min(1, { message: 'Type is required' }),
});

type FormData = z.infer<typeof schema>;

export default function UploadImageForm({
	id,
	refetch,
	open,
	onChange,
}: {
	id: string;
	refetch: () => void;
	open: boolean;
	onChange: (open: boolean) => void;
}) {
	const [files, setFiles] = useState<ICommonTypes.IFileWithPreview[]>([]);
	const { mutateAsync: uploadImage, isPending } = useCreateProductImage(id as string);

	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			type: '',
		},
	});

	const onSubmit = async (values: FormData) => {
		const formData = createFormDataForImage(files[0] as File, 'file', {
			imageType: values.type,
		});
		const response = await uploadImage(formData);
		if (response?.status === 'SUCCESS') {
			refetch();
			onChange(false);
		}
	};

	const handleFilesUpdate = (newFiles: ICommonTypes.IFileWithPreview[]) => {
		setFiles(newFiles);
	};

	return (
		<Sheet open={open} onOpenChange={onChange}>
			<SheetContent side="bottom">
				<SheetHeader className="mb-24">
					<SheetTitle>Add Image</SheetTitle>
					<SheetDescription>You can upload only one image at a time</SheetDescription>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="max-w-screen-lg mx-auto flex flex-col gap-12"
					>
						<DropZone files={files} setFiles={handleFilesUpdate} />
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Choose Type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="SMALL">Small</SelectItem>
											<SelectItem value="MEDIUM">Medium</SelectItem>
											<SelectItem value="LARGE">Large</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<SheetFooter className="mt-24 flex gap-4">
							<SheetClose asChild>
								<Button className="w-[180px]" variant="outline">
									Close
								</Button>
							</SheetClose>
							<Button
								type="submit"
								disabled={isPending || files.length <= 0}
								className="w-[180px]"
								loading={isPending}
							>
								Submit
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
