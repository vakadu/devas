import { useState, ChangeEvent } from 'react';

import {
	Button,
	ImagePlaceholder,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@devas/ui';
import { createFormDataForImage } from '../../../../../../../core/helpers';
import { useUploadImages } from '../../context/upload-images';
import useUploadProductImage from '../../api/upload-image';

export default function UploadImageForm({ id, refetch }: { id: string; refetch: () => void }) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [value, setValue] = useState<string | null>(null);
	const { attributeKey, toggleForm } = useUploadImages();
	const { mutateAsync: uploadImage, isPending } = useUploadProductImage(id as string);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setSelectedFile(file);
	};

	const onSubmit = async () => {
		const formData = createFormDataForImage(selectedFile as File, 'file', {
			priority: value,
			attributeKey,
		});
		const response = await uploadImage(formData);
		if (response?.status === 'SUCCESS') {
			refetch();
			toggleForm(false);
		}
	};

	return (
		<div className="flex flex-col gap-12">
			<Select value={value || ''} onValueChange={setValue}>
				<SelectTrigger>
					<SelectValue placeholder="Choose Priority" />
				</SelectTrigger>
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
			<div className="flex flex-col gap-12">
				<Input type="file" onChange={(e) => handleFileChange(e)} />
				{selectedFile && (
					<ImagePlaceholder
						src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
						containerClasses="w-[200px] h-[200px]"
						imageClasses="object-cover rounded-12"
						alt={selectedFile?.name}
					/>
				)}
			</div>
			<Button
				onClick={onSubmit}
				loading={isPending}
				loadingText="Uploading..."
				disabled={!selectedFile || !value || isPending}
			>
				Submit
			</Button>
		</div>
	);
}
