import { Loader2, X } from 'lucide-react';

import { Button, ImagePlaceholder } from '@devas/ui';
import { useDeleteBannerImage } from '../api/remove-banner-image';

interface IImageItemProps {
	image: ICatalougeTypes.IBannerImage;
	refetch: () => void;
	id: string;
	setShowForm: (b: boolean) => void;
	setImageDetails: (image: ICatalougeTypes.IBannerImage) => void;
	activeId: string | undefined;
}

export default function ImageItem({
	image,
	refetch,
	id,
	setShowForm,
	setImageDetails,
	activeId,
}: IImageItemProps) {
	const { mutateAsync: deleteBannerImage, isPending } = useDeleteBannerImage(id as string);

	const handleDelete = async (event: React.MouseEvent) => {
		event.stopPropagation();
		const response = await deleteBannerImage({ bannerImageId: image._id });
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	const handleImageClick = async (event: React.MouseEvent) => {
		event.stopPropagation();
		setShowForm(true);
		setImageDetails(image);
	};

	return (
		<div
			className={`relative z-10 w-full h-[182px] p-4 col-span-1 border border-grey-light rounded-[12px] ${
				activeId === image._id ? 'border-primary border-2 shadow-card1' : ''
			}`}
			onClick={handleImageClick}
		>
			<ImagePlaceholder
				src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.url}`}
				containerClasses="w-full h-full rounded-[12px] flex justify-center items-center flex-col gap-6 cursor-pointer"
				imageClasses="rounded-[12px] object-cover"
			/>
			<Button
				variant="destructive"
				size="icon"
				className="absolute top-[-12px] right-[-10px] rounded-full z-50"
				onClick={handleDelete}
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
