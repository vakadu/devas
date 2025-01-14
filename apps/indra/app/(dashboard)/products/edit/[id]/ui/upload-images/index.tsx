import { useParams } from 'next/navigation';
import { PlusCircle } from 'lucide-react';

import { useGetProductById } from '../../api';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Spinner } from '@devas/ui';
import UploadImageForm from './form';
import { useUploadImages } from '../../context/upload-images';
import ImagesList from './list';

type IProductKeys = 'smallImages' | 'mediumImages' | 'largeImages';

export default function ImagesContainer() {
	const params = useParams();
	const { data, isPending, refetch } = useGetProductById(params?.id as string);
	const imagesData = data?.data?.product?.images || [];
	const { setAttributeKey, setAttributeName, toggleForm, showForm } = useUploadImages();

	const handleUpload = async () => {
		toggleForm(true);
	};

	if (isPending) {
		return <Spinner />;
	}

	const handleAccordian = (_id: string) => {
		// setAttributeKey(name);
		// setAttributeName(title);
		// toggleForm(false);
	};
	console.log(imagesData);

	return (
		<div className="bg-white px-16 rounded-8">
			<Accordion className="" type="single" collapsible>
				{imagesData.map((image) => (
					<AccordionItem key={image._id} value={image._id}>
						<AccordionTrigger className="text-muted-foreground">
							{image._id}
						</AccordionTrigger>
						<AccordionContent className="">
							<div className="">
								<ImagesList
									key={image._id}
									image={image}
									refetch={refetch}
									id={params?.id as string}
								/>
								{/* {imagesData?.map((image: ICatalougeTypes.IProductImage) => (
									<ImagesList
										key={image._id}
										image={image}
										refetch={refetch}
										id={params?.id as string}
									/>
								))} */}
								{/* {productData?.[name].length < 6 && (
									<div
										onClick={handleUpload}
										className="border border-orange w-[142px] h-[142px] rounded-[18px] shadow-md flex justify-center items-center flex-col gap-6 cursor-pointer"
									>
										<PlusCircle className="text-orange" />
										<div className="text-orange font-bold text-14">Upload</div>
									</div>
								)} */}
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			{/* {showForm && (
				<div className="col-span-1">
					<UploadImageForm id={params?.id as string} refetch={refetch} />
				</div>
			)} */}
		</div>
	);
}
