import { AddEditBanner } from '../../../../core/ui';

export default function Page() {
	return (
		<div className="m-16 grid grid-cols-3">
			<h2 className="text-24 font-medium col-span-3 mb-12">Add a Banner</h2>
			<AddEditBanner type="ADD" />
		</div>
	);
}
