import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@devas/ui';
import { useEditProduct } from '../../context/edit-product';
import { Edit, PlusIcon, Trash2 } from 'lucide-react';
import { useRemoveAttributeImage } from '../../../../../../../core/api';

export default function Attributes({
	id,
	name,
	title,
	data,
	refetch,
}: {
	id: string;
	name: string;
	title: string;
	data: ICatalougeTypes.ISpecifications[];
	refetch: () => void;
}) {
	const { setAttributeKey, setAttributeName, toggleForm, setType, setAttribute } =
		useEditProduct();
	const { mutateAsync: removeAttribute } = useRemoveAttributeImage(id);

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

	const handleDelete = async (attribute: ICatalougeTypes.ISpecifications) => {
		const payload = {
			attributeKey: name,
			id: attribute._id,
		};
		const response = await removeAttribute(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
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
							<div className="flex gap-16">
								<Button
									onClick={() => handleEdit(attribute)}
									size="icon"
									variant="ghost"
								>
									<Edit className="!size-18" />
								</Button>
								<Dialog>
									<DialogTrigger
										className="w-full py-12 flex gap-12 items-center"
										asChild
									>
										<Button size="icon" variant="ghost">
											<Trash2 className="!size-18 text-red-1" />
										</Button>
									</DialogTrigger>
									<DialogContent className="gap-24">
										<DialogHeader>
											<DialogTitle className="text-24">
												Remove Attribute?
											</DialogTitle>
											<DialogDescription>
												Are you sure you want the attribute?
											</DialogDescription>
										</DialogHeader>
										<DialogFooter className="!pt-32">
											<Button
												onClick={() => handleDelete(attribute)}
												size="lg"
												className="px-24"
												variant="destructive"
											>
												Remove
											</Button>
											<DialogClose asChild>
												<Button size="lg" variant="ghost">
													Cancel
												</Button>
											</DialogClose>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</div>
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
