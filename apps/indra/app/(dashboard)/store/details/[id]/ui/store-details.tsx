import { useGetStoreDetails } from '../api/get-store-details';

export default function StoreDetails({ id }: { id: string }) {
	const { data } = useGetStoreDetails(id);

	return <div></div>;
}
