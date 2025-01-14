'use client';

import { useParams } from 'next/navigation';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { useGetBannerById } from '../api/get-banner-by-id';
import ImageItem from './image-item';
import { Button, Sheet } from '@devas/ui';
import { BannerImageSheet } from '../../../../../../core/ui';

export default function AddEditImages() {
	const params = useParams();
	const { data, refetch } = useGetBannerById(params?.id as string);
	const [show, setShow] = useState(false);

	return (
		<div className="flex gap-24">
			{data?.data?.banner?.images?.map((image) => {
				return (
					<ImageItem
						image={image}
						key={image._id}
						refetch={refetch}
						id={params?.id as string}
					/>
				);
			})}
			<div className="col-span-1">
				<Button
					variant="outline"
					size="icon"
					className="w-[182px] h-[182px] rounded-[12px] shadow-md flex flex-col"
					onClick={() => setShow(true)}
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
	);
}
