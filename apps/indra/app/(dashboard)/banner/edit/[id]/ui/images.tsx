'use client';

import { useParams } from 'next/navigation';
import { PlusIcon, X } from 'lucide-react';
import { useState } from 'react';

import { useGetBannerById } from '../api/get-banner-by-id';
import { Button, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@devas/ui';
import { BannerImageSheet } from '../../../../../../core/ui';
import EditImage from './edit-image-details';
import ImageItem from './image';

export default function Images() {
	const params = useParams();
	const { data, refetch } = useGetBannerById(params?.id as string);
	const [updateImage, setUpdateImage] = useState(false);
	const [imageType, setImageType] = useState<null | 'EDIT' | 'ADD'>(null);
	const [updateDetails, setUpdateDetails] = useState(false);
	const [imageDetails, setImageDetails] = useState<ICatalougeTypes.IBannerImage | null>(null);

	const handleUpdateImageDetails = (image: ICatalougeTypes.IBannerImage) => {
		setImageDetails(image);
		setUpdateDetails(true);
	};

	const handleUpdateImage = (
		image: ICatalougeTypes.IBannerImage | null,
		type: 'EDIT' | 'ADD'
	) => {
		setImageDetails(image);
		setUpdateImage(true);
		setImageType(type);
	};

	return (
		<div className="grid grid-cols-3 gap-12 mt-24">
			{data?.data?.banner?.images?.map((image) => {
				return (
					<ImageItem
						image={image}
						key={image._id}
						handleUpdateImage={handleUpdateImage}
						handleUpdateImageDetails={handleUpdateImageDetails}
						refetch={refetch}
						id={params?.id as string}
					/>
				);
			})}
			<div className="col-span-1">
				<Button
					variant="outline"
					size="icon"
					className="w-full h-[142px] rounded-[18px] shadow-md flex flex-col"
					onClick={() => handleUpdateImage(null, 'ADD')}
				>
					<PlusIcon />
					<span className="text-14 font-semibold">Add More</span>
				</Button>
			</div>
			<Sheet open={updateImage} onOpenChange={setUpdateImage}>
				<BannerImageSheet
					refetch={refetch}
					id={params?.id as string}
					type={imageType as 'EDIT' | 'ADD'}
					image={imageDetails}
					setUpdateImage={setUpdateImage}
				/>
			</Sheet>
			<Sheet open={updateDetails} onOpenChange={setUpdateDetails}>
				<SheetContent className="h-[calc(100vh-100px)]" side="bottom">
					<SheetHeader>
						<SheetTitle>Edit Image Details</SheetTitle>
						<SheetDescription></SheetDescription>
					</SheetHeader>
					{imageDetails && (
						<EditImage
							details={imageDetails}
							id={params?.id as string}
							setUpdateDetails={setUpdateDetails}
							refetch={refetch}
						/>
					)}
				</SheetContent>
			</Sheet>
		</div>
	);
}
