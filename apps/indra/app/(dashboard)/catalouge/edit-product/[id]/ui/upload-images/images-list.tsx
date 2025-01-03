import { useParams } from 'next/navigation';
import { PlusCircle } from 'lucide-react';

import { useGetProductById } from '../../api';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Spinner } from '@devas/ui';
import UploadImageForm from './form';
import { useUploadImages } from '../../context/upload-images';

export default function ImagesList() {
	const params = useParams();
	const { data, isPending, refetch } = useGetProductById(params?.id as string);
	const productData = data?.data?.product || ({} as ICatalougeTypes.IProduct);
	const { setAttributeKey, setAttributeName, toggleForm, showForm } = useUploadImages();

	const images = [
		['smallImages', 'Small Images'],
		['mediumImages', 'Medium Images'],
		['largeImages', 'Large Images'],
	];

	if (isPending) {
		return <Spinner />;
	}

	const handleAccordian = (name: string, title: string) => {
		setAttributeKey(name);
		setAttributeName(title);
		toggleForm(false);
	};

	const handleUpload = async (name: string) => {
		toggleForm(true);
	};

	return (
		<div className="grid grid-cols-3 gap-54">
			<Accordion className="col-span-2" type="single" collapsible>
				{images.map(([name, title]) => {
					return (
						<AccordionItem key={name} value={name}>
							<AccordionTrigger
								onClick={() => handleAccordian(name, title)}
								className="text-muted-foreground"
							>
								{title}
							</AccordionTrigger>
							<AccordionContent>
								<div
									onClick={() => handleUpload(name)}
									className="border border-orange w-[120px] h-[120px] rounded-[18px] shadow-md flex justify-center items-center flex-col gap-6 cursor-pointer"
								>
									<PlusCircle className="text-orange" />
									<div className="text-orange font-bold text-14">Upload</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
			{showForm && (
				<div className="col-span-1">
					<UploadImageForm id={params?.id as string} refetch={refetch} />
				</div>
			)}
		</div>
	);
}
