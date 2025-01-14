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
	Spinner,
} from '@devas/ui';
import ImagesList from './list';
import PriorityUpdateForm from './priority-form';
import { useRemoveProductImage } from '../../api/remove-product-image';

const UploadImageForm = dynamic(() => import('./upload-image-form'), {
	loading: () => <span>Loading...</span>,
});

export default function ImagesContainer() {
	const params = useParams();
	const { data, isPending, refetch } = useGetProductById(params?.id as string);
	const imagesData = data?.data?.product?.images || [];
	const { mutateAsync: removeProductImage } = useRemoveProductImage(params?.id as string);
	const [show, setShow] = useState(false);
	const [showSheet, setShowSheet] = useState(false);

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

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="bg-white px-16 rounded-8">
			<UploadImageForm
				open={showSheet}
				onChange={setShowSheet}
				id={params?.id as string}
				refetch={refetch}
			/>
			<Accordion className="" type="single" collapsible>
				{imagesData.map((image) => (
					<AccordionItem className="relative" key={image._id} value={image._id}>
						<AccordionTrigger className="text-muted-foreground">
							{image._id}
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
										<AlertDialogAction onClick={() => handleDelete(image._id)}>
											Continue
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
							<div className="">
								<ImagesList
									image={image}
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
				))}
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
