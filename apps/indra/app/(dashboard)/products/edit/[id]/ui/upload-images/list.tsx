import { ChangeEvent, useState } from 'react';
import { SendIcon, X } from 'lucide-react';

import {
	Button,
	ImagePlaceholder,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@devas/ui';
import { createFormDataForImage } from '../../../../../../../core/helpers';
import useUploadProductImage from '../../api/upload-image';
import { useUploadImages } from '../../context/upload-images';
import { useRemoveAttributeImage } from '../../../../../../../core/api';

export default function ImagesList({
	image,
	refetch,
	id,
}: {
	image: ICatalougeTypes.IProductImage;
	refetch: () => void;
	id: string;
}) {
	const [value, setValue] = useState(`${image.priority}`);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { mutateAsync: uploadImage, isPending } = useUploadProductImage(id as string);
	const { attributeKey } = useUploadImages();
	const { mutateAsync: removeAttribute, isPending: isLoading } = useRemoveAttributeImage(id);
	console.log(image);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	const handleDelete = async () => {
		const payload = {
			productImageId: image._id,
		};
		const response = await removeAttribute(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	const onSubmit = async () => {
		const formData = createFormDataForImage(selectedFile as File, 'file', {
			priority: value,
			attributeKey,
		});
		const response = await uploadImage(formData);
		if (response?.status === 'SUCCESS') {
			refetch();
		}
	};

	return (
		<div className="flex flex-col gap-6 bg-white" key={image._id}>
			<div className="relative flex gap-12">
				{image.smallUrl && image.smallUrl !== '' && (
					<ImagePlaceholder
						src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.smallUrl}`}
						containerClasses="w-[242px] h-[242px] flex justify-center items-center flex-col gap-6 cursor-pointer"
						imageClasses="object-cover rounded-8"
					/>
				)}
				{image.mediumUrl && image.mediumUrl !== '' && (
					<ImagePlaceholder
						src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.mediumUrl}`}
						containerClasses="w-[242px] h-[242px] flex justify-center items-center flex-col gap-6 cursor-pointer"
						imageClasses="object-cover rounded-8"
					/>
				)}
				{image.largeUrl && image.largeUrl !== '' && (
					<ImagePlaceholder
						src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.largeUrl}`}
						containerClasses="w-[242px] h-[242px] flex justify-center items-center flex-col gap-6 cursor-pointer"
						imageClasses="object-cover rounded-8"
					/>
				)}
				<Button
					onClick={handleDelete}
					className="z-10 w-24 h-24 absolute -top-12 -right-12 bg-red-1 rounded-full flex justify-center items-center cursor-pointer"
				>
					<X className="!size-18 text-white" />
				</Button>
			</div>
			{/* <div className="flex gap-6 px-8 pb-8">
				<Select value={value || ''} onValueChange={setValue}>
					<SelectTrigger className="flex-1">
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
				<Button
					disabled={isPending}
					onClick={onSubmit}
					className="h-42 w-42"
					variant="ghost"
					size="icon"
				>
					<SendIcon />
				</Button>
			</div> */}
		</div>
	);
}
