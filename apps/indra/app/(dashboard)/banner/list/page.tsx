import dynamic from 'next/dynamic';

import { Spinner } from '@devas/ui';

const Listing = dynamic(() => import('./ui/list'), {
	loading: () => <Spinner />,
});

export default function Page() {
	return (
		<div className="w-full p-16 h-full">
			<div className="h-full">
				<Listing />
			</div>
		</div>
	);
}
