'use client';

import { useState } from 'react';

import {
	Button,
	DropZone,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@devas/ui';
import { useCreateBannerImage } from '../../app/(dashboard)/banner/edit/[id]/api/add-banner-image';
import { createFormDataForImage } from '../helpers';
import { useUpdateBannerImage } from '../../app/(dashboard)/banner/edit/[id]/api/update-banner-image';

export function BannerImageSheet({
	type,
	id,
	refetch,
	setUpdateImage,
	image,
}: {
	type: 'ADD' | 'EDIT';
	id: string;
	refetch: () => void;
	setUpdateImage: (type: boolean) => void;
	image: ICatalougeTypes.IBannerImage | null;
}) {
	const [files, setFiles] = useState<ICommonTypes.IFileWithPreview[]>([]);
	const { mutateAsync: createBanner, isPending } = useCreateBannerImage(id);
	const { mutateAsync: updateBanner, isPending: isLoading } = useUpdateBannerImage(id);

	const handleSubmit = async () => {
		if (type === 'ADD') {
			const formData = createFormDataForImage(files[0] as File, 'file');
			const response = await createBanner(formData);
			if (response.status === 'SUCCESS') {
				refetch();
				setUpdateImage(false);
				setFiles([]);
			}
		} else {
			if (image) {
				const formData = createFormDataForImage(files[0] as File, 'file', {
					bannerImageId: image?._id,
				});
				const response = await updateBanner(formData);
				if (response.status === 'SUCCESS') {
					refetch();
					setUpdateImage(false);
					setFiles([]);
				}
			}
		}
	};

	return (
		<SheetContent side="bottom">
			<SheetHeader className="mb-24">
				<SheetTitle>{type === 'ADD' ? 'Add Image' : 'Edit Image'}</SheetTitle>
				<SheetDescription>You can upload only one image at a time</SheetDescription>
			</SheetHeader>
			<div className="max-w-screen-lg mx-auto">
				<DropZone files={files} setFiles={setFiles} />
			</div>
			<SheetFooter className="mt-24">
				<SheetClose asChild>
					<Button className="w-[180px]" variant="outline">
						Close
					</Button>
				</SheetClose>
				<Button
					onClick={handleSubmit}
					disabled={files.length <= 0 || isPending || isLoading}
					className="w-[180px]"
					loading={isPending || isLoading}
				>
					Submit
				</Button>
			</SheetFooter>
		</SheetContent>
	);
}
