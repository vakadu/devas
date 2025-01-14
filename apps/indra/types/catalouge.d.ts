declare namespace ICatalougeTypes {
	interface IProduct {
		_id: string;
		title: string;
		productId: string;
		description: string;
		quantity: number;
		mrp: number;
		price: number;
		gstInPercent: number;
		brand: string;
		category: string;
		subcategory: string;
		colour: string;
		size: string;
		tags: ISpecifications[];
		updatedBy: string;
		active: boolean;
		images: IProductImage[];
		productSpecification: ISpecifications[];
		productDescription: ISpecifications[];
		aboutThisItem: ISpecifications[];
		topHighlights: ISpecifications[];
		additionalInformation: ISpecifications[];
		technicalDetails: ISpecifications[];
		whatIsInTheBox: ISpecifications[];
		createdAt: string;
		updatedAt: string;
		hsn: string;
		packQuantity: number;
		productVariantIds?: string[];
		dimensions: ISpecifications[];
	}

	interface IProductImage {
		smallUrl: string;
		mediumUrl: string;
		largeUrl: string;
		priority: number;
		active: boolean;
		_id: string;
		createdAt: string;
		updatedAt: string;
	}

	interface ISpecifications {
		key: string;
		value: string;
		_id: string;
		createdAt: string;
		updatedAt: string;
	}
	interface IBanner {
		_id: string;
		title: string;
		description: string;
		type: string;
	}
	interface IBannerDetails {
		title: string;
		description: string;
		type: string;
		active: boolean;
		updatedBy: string;
		images: IBannerImage[];
		createdAt: string;
		updatedAt: string;
		_id: string;
	}
	interface IBannerImage {
		title: string;
		description: string;
		url: string;
		xPriority: number;
		yPriority: number;
		productIds: string[];
		active: boolean;
		_id: string;
		createdAt: string;
		updatedAt: string;
	}
	interface IStore {
		mobile: string;
		name: string;
		userId: string;
		_id: string;
	}

	interface IStoreProducts {
		_id: string;
		storeProductId: string;
		storeId: string;
		productId: string;
		status: 'ADDED' | 'APPROVED' | 'HOLD';
		quantity: number;
		price: number;
		discount: number;
		comment: string | null;
		active: boolean;
		product: IStoreProduct;
	}

	interface IStoreProduct {
		productId: string;
		title: string;
		packQuantity: number;
		gstInPercent: number;
		hsn: string;
		mrp: number;
		brand: string;
		category: string;
		colour: string;
		size: string;
	}
}
