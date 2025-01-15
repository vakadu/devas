import { PlusIcon } from 'lucide-react';

import { ImagePlaceholder } from '@devas/ui';
import EditImageForm from './edit-image-form';
import { useState } from 'react';

export default function ImagesList({
	image,
	imageId,
	refetch,
	id,
}: {
	image: ICatalougeTypes.IProductImage;
	imageId: string | null;
	refetch: () => void;
	id: string;
}) {
	const containerClasses =
		'w-[242px] h-[242px] flex justify-center items-center flex-col gap-6 cursor-pointer border border-grey-light rounded-8';
	const imageClasses = 'object-cover rounded-8';
	const [imageType, setImageType] = useState<string | null>(null);
	const [show, setShow] = useState(false);

	const handleImageType = (type: string) => {
		setImageType(type);
		setShow(true);
	};

	return (
		<div className="flex flex-col gap-6 bg-white" key={image._id}>
			<EditImageForm
				imageId={imageId}
				imageType={imageType}
				refetch={refetch}
				show={show}
				setShow={setShow}
				id={id}
			/>
			<div className="relative flex gap-12">
				{image.smallUrl && image.smallUrl !== '' ? (
					<ImagePlaceholder
						src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.smallUrl}`}
						containerClasses={containerClasses}
						imageClasses={imageClasses}
						onClick={() => handleImageType('SMALL')}
					/>
				) : (
					<AddMore type="SMALL" handleImageType={handleImageType} />
				)}
				{image.mediumUrl && image.mediumUrl !== '' ? (
					<ImagePlaceholder
						src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.mediumUrl}`}
						containerClasses={containerClasses}
						imageClasses={imageClasses}
						onClick={() => handleImageType('MEDIUM')}
					/>
				) : (
					<AddMore type="MEDIUM" handleImageType={handleImageType} />
				)}
				{image.largeUrl && image.largeUrl !== '' ? (
					<ImagePlaceholder
						src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.largeUrl}`}
						containerClasses={containerClasses}
						imageClasses={imageClasses}
						onClick={() => handleImageType('LARGE')}
					/>
				) : (
					<AddMore type="LARGE" handleImageType={handleImageType} />
				)}
			</div>
		</div>
	);
}

const AddMore = ({
	type,
	handleImageType,
}: {
	type: string;
	handleImageType: (type: string) => void;
}) => {
	return (
		<div
			onClick={() => handleImageType(type)}
			className="w-[242px] h-[242px] flex justify-center items-center flex-col gap-6 cursor-pointer border border-grey-light rounded-8"
		>
			<PlusIcon className="size-24" />
		</div>
	);
};
