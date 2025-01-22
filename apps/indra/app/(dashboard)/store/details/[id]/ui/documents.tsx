import { useState } from 'react';

import { Accordion, Spinner } from '@devas/ui';
import { useGetStoreDetails } from '../api/get-store-details';
import StoreUpload from './store-upload';

export default function StoreDetails({ id }: { id: string }) {
	const { data, isPending } = useGetStoreDetails(id);
	const details = data?.data?.store || ({} as IStoreTypes.IStoreDetails);
	const [show, setShow] = useState<string>('LOGO');

	if (isPending) {
		return <Spinner />;
	}

	return (
		<Accordion
			value={show}
			onValueChange={setShow}
			type="single"
			collapsible
			className="bg-white rounded-8 shadow-card1"
		>
			{[
				{ label: 'LOGO', value: details?.logoUrl },
				{ label: 'GST', value: details?.gstUrl },
				{ label: 'PAN', value: details?.panUrl },
				{ label: 'OTHER', value: details?.otherDocUrl },
			].map((type) => {
				return <StoreUpload value={show} stroreId={id} key={type.label} storeType={type} />;
			})}
		</Accordion>
	);
}
