import { AddEditStoreProduct, ProductListing } from '../../../../../core/ui';

export default function Page() {
	return (
		<div className="m-16">
			<h2 className="text-24 font-medium mb-12">Add a Store Product</h2>
			<ProductListing>
				<AddEditStoreProduct type="ADD" />
			</ProductListing>
		</div>
	);
}
