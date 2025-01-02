import { AccordionContent, AccordionItem, AccordionTrigger, Button } from '@devas/ui';
import { useEditProduct } from '../context';
import { Edit, PlusIcon } from 'lucide-react';

export default function Attributes({
	name,
	title,
	data,
}: {
	name: string;
	title: string;
	data: ICatalougeTypes.ISpecifications[];
}) {
	const { setAttributeKey, setAttributeName, toggleForm, setType, setAttribute } =
		useEditProduct();

	const handleAccordian = () => {
		setAttributeKey(name);
		setAttributeName(title);
		toggleForm(false);
		setAttribute(null);
		setType(null);
	};

	const handleEdit = (attribute: ICatalougeTypes.ISpecifications) => {
		toggleForm(true);
		setType('EDIT');
		setAttribute(attribute);
	};

	const handleAddAttribute = () => {
		toggleForm(true);
		setType('ADD');
	};

	return (
		<AccordionItem value={name}>
			<AccordionTrigger onClick={handleAccordian} className="text-muted-foreground">
				{title}
			</AccordionTrigger>
			<AccordionContent>
				{data?.map((attribute) => {
					return (
						<div
							className="border mb-16 border-grey-divider flex justify-between py-8 rounded-8 px-12"
							key={attribute._id}
						>
							<div className="flex gap-12 flex-col">
								<div className="font-medium">{attribute.key}</div>
								<div className="text-14">{attribute.value}</div>
							</div>
							<Button
								onClick={() => handleEdit(attribute)}
								size="icon"
								variant="ghost"
							>
								<Edit className="!size-18" />
							</Button>
						</div>
					);
				})}
				<Button onClick={handleAddAttribute} className="my-16">
					<PlusIcon />
					<span>Add Attributes</span>
				</Button>
			</AccordionContent>
		</AccordionItem>
	);
}
