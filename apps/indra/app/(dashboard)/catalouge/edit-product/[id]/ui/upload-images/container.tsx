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
	const productData =
		data?.data?.product || ({} as Record<IProductKeys, ICatalougeTypes.IProductImage[]>);
	const { setAttributeKey, setAttributeName, toggleForm, showForm } = useUploadImages();

	const images: [IProductKeys, string][] = [
		['smallImages', 'Small Images'],
		['mediumImages', 'Medium Images'],
		['largeImages', 'Large Images'],
	];

	const handleUpload = async () => {
		toggleForm(true);
	};

	if (isPending) {
		return <Spinner />;
	}

	const handleAccordian = (name: string, title: string) => {
		setAttributeKey(name);
		setAttributeName(title);
		toggleForm(false);
	};

	return (
		<div className="grid grid-cols-3 gap-54">
			<Accordion className="col-span-2" type="single" collapsible>
				{images.map(([name, title]) => (
					<AccordionItem key={name} value={name}>
						<AccordionTrigger
							onClick={() => handleAccordian(name, title)}
							className="text-muted-foreground"
						>
							{title}
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex gap-12">
								{productData?.[name]?.map(
									(image: ICatalougeTypes.IProductImage) => (
										<ImagesList
											key={image._id}
											image={image}
											refetch={refetch}
											id={params?.id as string}
										/>
									)
								)}
								{productData?.[name].length < 6 && (
									<div
										onClick={handleUpload}
										className="border border-orange w-[142px] h-[142px] rounded-[18px] shadow-md flex justify-center items-center flex-col gap-6 cursor-pointer"
									>
										<PlusCircle className="text-orange" />
										<div className="text-orange font-bold text-14">Upload</div>
									</div>
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			{showForm && (
				<div className="col-span-1">
					<UploadImageForm id={params?.id as string} refetch={refetch} />
				</div>
			)}
		</div>
	);
}
