import AddEditBanner from '../../../../core/ui/add-edit-banner';

export default function Page() {
	return (
		<div className="m-16 bg-white p-16 rounded-8">
			<h2 className="text-24 font-medium">Add a Banner</h2>
			<AddEditBanner type="ADD" />
		</div>
	);
}
