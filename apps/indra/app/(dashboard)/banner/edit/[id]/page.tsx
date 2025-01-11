import { AddEditBanner } from '../../../../../core/ui';
import AddEditImages from './ui/add-edit-images';

export default function Page() {
	return (
		<div className="m-16 grid grid-cols-5 gap-24">
			<div className="bg-white col-span-3 p-16 rounded-8">
				<h2 className="text-24 font-medium">Edit Banner</h2>
				<AddEditBanner type="EDIT" />
			</div>
			<div className="bg-white col-span-2 p-16 rounded-8">
				<h2 className="text-24 font-medium">Edit Images</h2>
				<AddEditImages />
			</div>
		</div>
	);
}
