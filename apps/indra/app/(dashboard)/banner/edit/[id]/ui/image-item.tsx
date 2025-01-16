import { Loader2, X } from 'lucide-react';

import { Button, ImagePlaceholder } from '@devas/ui';
import { useDeleteBannerImage } from '../api/remove-banner-image';

interface IImageItemProps {
	image: ICatalougeTypes.IBannerImage;
	refetch: () => void;
	id: string;
	setShowForm: (b: boolean) => void;
	setImageDetails: (image: ICatalougeTypes.IBannerImage) => void;
}

export default function ImageItem({
	image,
	refetch,
	id,
	setShowForm,
	setImageDetails,
}: IImageItemProps) {
	const { mutateAsync: deleteBannerImage, isPending } = useDeleteBannerImage(id as string);

	const handleDelete = async (event: React.MouseEvent) => {
		event.stopPropagation();
		const response = await deleteBannerImage({ bannerImageId: image._id });
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	const handleRoute = async (event: React.MouseEvent) => {
		event.stopPropagation();
		setShowForm(true);
		setImageDetails(image);
		// router.push(`${Routes.EditBannerImages}/${params?.id}/${image._id}?type=products`);
	};

	return (
		<div className="relative z-10 w-full h-[182px] col-span-1" onClick={handleRoute}>
			<ImagePlaceholder
				src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.url}`}
				containerClasses="border border-grey-light w-full h-[182px] rounded-[12px] shadow-md flex justify-center items-center flex-col gap-6 cursor-pointer"
				imageClasses="rounded-[12px] object-cover"
			/>
			<Button
				variant="destructive"
				size="icon"
				className="absolute top-[-6px] right-[-4px] rounded-full z-50"
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
