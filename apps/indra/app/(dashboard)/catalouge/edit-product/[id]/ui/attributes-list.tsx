import { useParams } from 'next/navigation';

import { Accordion, Spinner } from '@devas/ui';
import { useGetProductById } from '../api';
import Attributes from './attributes';
import AttributeForm from './add-edit-attribute';
import { useEditProduct } from '../context';

type IAttributeItem = [name: string, value: string, data: ICatalougeTypes.ISpecifications[]];

export default function AttributesList() {
	const params = useParams();
	const { data, isPending, refetch } = useGetProductById(params?.id as string);
	const productData = data?.data?.product || ({} as ICatalougeTypes.IProduct);
	const { showForm } = useEditProduct();

	const attributes: IAttributeItem[] = [
		['productSpecification', 'Product Specifications', productData.productSpecification],
		['productDescription', 'Product Description', productData.productDescription],
		['aboutThisItem', 'About Product', productData.aboutThisItem],
		['topHighlights', 'Top Highlights', productData.topHighlights],
		['additionalInformation', 'Additional Information', productData.additionalInformation],
		['technicalDetails', 'Technical Details', productData.technicalDetails],
		['whatIsInTheBox', 'What Is In The Box', productData.whatIsInTheBox],
	];

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="grid grid-cols-3 gap-54">
			<Accordion className="col-span-2" type="single" collapsible>
				{attributes.map(([name, title, data]) => {
					return (
						<Attributes
							id={params?.id as string}
							key={name}
							name={name}
							title={title}
							data={data}
							refetch={refetch}
						/>
					);
				})}
			</Accordion>
			{showForm && <AttributeForm id={params?.id as string} refetch={refetch} />}
		</div>
	);
}
