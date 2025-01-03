import { useParams } from 'next/navigation';

import { useGetProductById } from '../../api';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Spinner } from '@devas/ui';
import UploadImageForm from './form';

export default function ImagesList() {
	const params = useParams();
	const { data, isPending, refetch } = useGetProductById(params?.id as string);
	const productData = data?.data?.product || ({} as ICatalougeTypes.IProduct);

	const images = [
		['smallImages', 'Small Images'],
		['mediumImages', 'Medium Images'],
		['largeImages', 'Large Images'],
	];

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="grid grid-cols-3 gap-54">
			<Accordion className="col-span-2" type="single" collapsible>
				{images.map(([name, title]) => {
					return (
						<AccordionItem key={name} value={name}>
							<AccordionTrigger className="text-muted-foreground">
								{title}
							</AccordionTrigger>
							<AccordionContent></AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
			<div className="col-span-1">
				<UploadImageForm />
			</div>
		</div>
	);
}
