import { Loader2, X } from 'lucide-react';
import { useState } from 'react';

import { Button, ImagePlaceholder } from '@devas/ui';
import { useDeleteBannerImage } from '../api/remove-banner-image';

interface IImageItemProps {
	handleUpdateImage: (image: ICatalougeTypes.IBannerImage | null, type: 'EDIT' | 'ADD') => void;
	handleUpdateImageDetails: (image: ICatalougeTypes.IBannerImage) => void;
	image: ICatalougeTypes.IBannerImage;
	refetch: () => void;
	id: string;
}

export default function ImageItem({
	handleUpdateImage,
	image,
	handleUpdateImageDetails,
	refetch,
	id,
}: IImageItemProps) {
	const [isHover, setHover] = useState(false);
	const { mutateAsync: deleteBannerImage, isPending } = useDeleteBannerImage(id as string);

	const handleDelete = async (image: ICatalougeTypes.IBannerImage) => {
		const response = await deleteBannerImage({ bannerImageId: image._id });
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className="col-span-1 relative"
		>
			<ImagePlaceholder
				src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.url}`}
				containerClasses="border border-orange w-full h-[142px] rounded-[18px] shadow-md flex justify-center items-center flex-col gap-6 cursor-pointer"
				imageClasses="rounded-[18px] object-cover p-6"
			/>
			{isHover && (
				<div className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-10 w-full h-full flex flex-col justify-center items-center gap-12 bg-black-1/50 rounded-[18px]">
					<div
						onClick={() => handleUpdateImage(image, 'EDIT')}
						className="bg-white text-12 py-6 px-8 rounded-full font-medium cursor-pointer"
					>
						Update Image
					</div>
					<div
						onClick={() => handleUpdateImageDetails(image)}
						className="bg-white text-12 py-6 px-8 rounded-full font-medium cursor-pointer"
					>
						Update Details
					</div>
				</div>
			)}
			<Button
				variant="destructive"
				size="icon"
				className="absolute top-[-6px] right-[-4px] rounded-full z-50"
				onClick={() => handleDelete(image)}
			>
				{isPending ? (
					<Loader2 className="animate-spin !size-16" />
				) : (
					<X className="!size-16" />
				)}
			</Button>
		</div>
	);
}
