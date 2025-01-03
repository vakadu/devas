import dynamic from "next/dynamic";

import { Spinner } from "@devas/ui";

const Listing = dynamic(() => import('./ui/listing'), {
	loading: () => <Spinner />
});

export default function Page() {
	return (
		<div className="w-full p-16 h-full">
			<div className="rounded-8 bg-white h-full">
				<Listing />
			</div>
		</div>
	);
}
