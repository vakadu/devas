declare namespace IStoreTypes {
	interface IStoreDetails {
		userId: string;
		mobile: string;
		name: string;
		active: boolean;
		addressId: string | null;
		gender: string;
		role: string;
		category: string;
		doctorIds: string[];
		createdAt: string;
		updatedAt: string;
		logoUrl?: string;
		updatedBy: string;
		panUrl?: string;
		gstUrl?: string;
		otherDocUrl?: string;
	}
}
