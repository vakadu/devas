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
		tags: string[];
		updatedBy: string;
		active: boolean;
		mediumImages: ProductImage[];
		smallImages: ProductImage[];
		largeImages: ProductImage[];
		productSpecification: ProductSpecification[];
		productDescription: string[];
		aboutThisItem: string[];
		topHighlights: string[];
		additionalInformation: string[];
		technicalDetails: string[];
		whatIsInTheBox: string[];
		createdAt: string;
		updatedAt: string;
		hsn: string;
		packQuantity: number;
	}

	interface IProductImage {
		url: string;
		priority: number;
		_id: string;
		createdAt: string;
		updatedAt: string;
	}

	interface IProductSpecification {
		key: string;
		value: string;
		_id: string;
		createdAt: string;
		updatedAt: string;
	}
}
