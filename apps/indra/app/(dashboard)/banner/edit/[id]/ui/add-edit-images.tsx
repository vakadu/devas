'use client';

import { useParams } from 'next/navigation';
import { PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { useGetBannerById } from '../api/get-banner-by-id';
import ImageItem from './image-item';
import { Button, Sheet } from '@devas/ui';
import { BannerImageSheet } from '../../../../../../core/ui';
import EditImageDetails from './form';

export default function AddEditImages() {
	const params = useParams();
	const { data, refetch } = useGetBannerById(params?.id as string);
	const [show, setShow] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [imageDetails, setImageDetails] = useState<null | ICatalougeTypes.IBannerImage>(null);

	const handleMore = () => {
		setShow(true);
		setShowForm(false);
	};
	const memoizedImage = useMemo(() => imageDetails, [imageDetails]);

	return (
		<div className="grid grid-cols-5 gap-24 items-start">
			<div className="grid grid-cols-3 gap-24 col-span-3 shadow-card1 bg-white p-16 rounded-8">
				{data?.data?.banner?.images?.map((image) => {
					return (
						<ImageItem
							image={image}
							key={image._id}
							refetch={refetch}
							id={params?.id as string}
							setShowForm={setShowForm}
							setImageDetails={setImageDetails}
							activeId={imageDetails?._id}
						/>
					);
				})}
				<div className="col-span-1 w-full h-[182px]">
					<Button
						variant="outline"
						size="icon"
						className="w-full h-[182px] rounded-[12px] shadow-md flex flex-col"
						onClick={handleMore}
					>
						<PlusIcon />
						<span className="text-14 font-semibold">Add More</span>
					</Button>
				</div>
				<Sheet open={show} onOpenChange={setShow}>
					<BannerImageSheet
						refetch={refetch}
						id={params?.id as string}
						type="ADD"
						setUpdateImage={setShow}
					/>
				</Sheet>
			</div>
			{showForm && (
				<div className="flex gap-24 col-span-2 shadow-card1 bg-white rounded-8">
					<EditImageDetails
						image={memoizedImage as ICatalougeTypes.IBannerImage}
						refetch={refetch}
						setShowForm={setShowForm}
					/>
				</div>
			)}
		</div>
	);
}
