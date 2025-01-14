import { Loader2, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button, ImagePlaceholder } from '@devas/ui';
import { useDeleteBannerImage } from '../api/remove-banner-image';
import { Routes } from '../../../../../../core/primitives';

interface IImageItemProps {
	image: ICatalougeTypes.IBannerImage;
	refetch: () => void;
	id: string;
}

export default function ImageItem({ image, refetch, id }: IImageItemProps) {
	const { mutateAsync: deleteBannerImage, isPending } = useDeleteBannerImage(id as string);
	const router = useRouter();
	const params = useParams();

	const handleDelete = async (event: React.MouseEvent) => {
		event.stopPropagation();
		const response = await deleteBannerImage({ bannerImageId: image._id });
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	const handleRoute = async (event: React.MouseEvent) => {
		event.stopPropagation();
		router.push(`${Routes.EditBannerImages}/${params?.id}/${image._id}?type=products`);
	};

	return (
		<div className="relative z-10 w-[182px] h-[182px]" onClick={handleRoute}>
			<ImagePlaceholder
				src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.url}`}
				containerClasses="border border-grey-light w-[182px] h-[182px] rounded-[12px] shadow-md flex justify-center items-center flex-col gap-6 cursor-pointer"
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
