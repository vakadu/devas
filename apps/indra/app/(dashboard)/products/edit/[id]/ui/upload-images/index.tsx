import { useParams } from 'next/navigation';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import { useGetProductById } from '../../api';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	ImagePlaceholder,
	Spinner,
} from '@devas/ui';
import ImagesList from './list';
import PriorityUpdateForm from './priority-form';
import { useRemoveProductImage } from '../../api/remove-product-image';

const AddImageForm = dynamic(() => import('./add-image-form'), {
	loading: () => <span>Loading...</span>,
});

export default function ImagesContainer() {
	const params = useParams();
	const { data, isPending, refetch } = useGetProductById(params?.id as string);
	const imagesData = data?.data?.product?.images || [];
	const { mutateAsync: removeProductImage } = useRemoveProductImage(params?.id as string);
	const [show, setShow] = useState(false);
	const [showSheet, setShowSheet] = useState(false);
	const [imageId, setImageId] = useState<string | null>(null);

	const handleDelete = async (id: string) => {
		const payload = {
			productImageId: id,
		};
		const response = await removeProductImage(payload);
		if (response.status === 'SUCCESS') {
			refetch();
			setShow(false);
		}
	};

	const getImageUrl = (image: ICatalougeTypes.IProductImage) => {
		if (image.smallUrl && image.smallUrl !== '') {
			return image.smallUrl;
		} else if (image.mediumUrl && image.mediumUrl !== '') {
			return image.mediumUrl;
		} else if (image.largeUrl && image.largeUrl !== '') {
			return image.largeUrl;
		} else {
			return '';
		}
	};

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="bg-white px-16 rounded-8">
			<AddImageForm
				open={showSheet}
				onChange={setShowSheet}
				id={params?.id as string}
				refetch={refetch}
			/>
			<Accordion className="" type="single" collapsible>
				{imagesData.map((image) => {
					return (
						<AccordionItem className="relative" key={image._id} value={image._id}>
							<AccordionTrigger
								onClick={() => setImageId(image._id)}
								className="text-muted-foreground"
							>
								{getImageUrl(image) ? (
									<ImagePlaceholder
										src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${getImageUrl(
											image
										)}`}
										containerClasses="w-[240px] h-[120px]"
										imageClasses="object-cover rounded-8"
									/>
								) : (
									''
								)}
							</AccordionTrigger>
							<AccordionContent className="relative">
								<AlertDialog open={show} onOpenChange={setShow}>
									<AlertDialogTrigger asChild>
										<Button
											className="absolute right-0 z-50"
											variant="destructive"
											size="sm"
										>
											<TrashIcon className="!size-16" />
											<span className="text-14">Delete</span>
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you absolutely sure?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently
												delete your account and remove your data.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>
												<span className="text-14 font-normal">Cancel</span>
											</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => handleDelete(image._id)}
											>
												Continue
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
								<div className="">
									<ImagesList
										image={image}
										imageId={imageId}
										refetch={refetch}
										id={params?.id as string}
									/>
									<PriorityUpdateForm
										image={image}
										refetch={refetch}
										id={params?.id as string}
									/>
								</div>
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
			<Button
				onClick={() => setShowSheet(true)}
				size="icon"
				className="fixed bottom-12 right-12 rounded-full w-54 h-54"
			>
				<PlusIcon />
			</Button>
		</div>
	);
}
