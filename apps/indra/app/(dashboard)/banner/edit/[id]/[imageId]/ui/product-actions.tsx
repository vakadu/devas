'use client';

import { PlusIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@devas/ui';
import { useProductListingContext } from '../../../../../../../core/ui/listing/context';
import { slideDown } from '@devas/utils';
import { useUpdateBannerImageProducts } from '../api/update-banner-image-products';
import { useParams } from 'next/navigation';
import { useGetBannerImagesProducts } from '../api/get-banner-image-products';

export default function ProductActions() {
	const { apiKey, rowSelection } = useProductListingContext();
	const productIds = Object.keys(rowSelection) || [];
	const params = useParams();
	const { mutateAsync: updateBannerImageProducts, isPending } = useUpdateBannerImageProducts(
		params?.id as string
	);
	const { refetch } = useGetBannerImagesProducts(params?.id as string, params?.imageId as string);

	const handleAddProducts = async () => {
		const payload = {
			productIds,
			bannerImageId: params?.imageId as string,
		};
		const response = await updateBannerImageProducts(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	return (
		<>
			{apiKey === 'products/banners' && productIds.length > 0 && (
				<motion.div
					initial="initial"
					animate="animate"
					exit="exit"
					variants={slideDown}
					className="p-12 border-b border-grey-light"
				>
					<Button
						disabled={isPending}
						loading={isPending}
						onClick={handleAddProducts}
						size="lg"
					>
						<PlusIcon className="!text-16" />
						<span className="font-medium text-14">Add Selected Items</span>
					</Button>
				</motion.div>
			)}
		</>
	);
}
