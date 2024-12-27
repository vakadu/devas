declare namespace ICategoryTypes {
	interface ICategoryItem {
		id: string;
		displayName: string;
		slug: string;
		image: string;
		orderBy: number;
		subCateogry?: ISubCategory[];
	}

	interface ISubCategory {
		id: string;
		displayName: string;
		slug: string;
		image: string;
		orderBy: number;
	}
	interface IProduct {
		brand: string;
		category: string;
		description: string;
		discount: number;
		gostorAsn: string;
		id: number;
		model: string;
		mrp: number;
		parentCategory: string;
		primaryImgPath: string;
		priority: number;
		productId: string;
		quantity: number;
		storePrice: number;
		supplierId: number;
		title: string;
	}
	interface IImage {
		productId: number;
		sequence: number;
		spath: string;
		mpath: string;
		lpath: string;
	}
	interface IDeliveryDateRange {
		fromDate: string;
		toDate: string;
	}
	interface IProductDetails {
		objectID: string;
		productId: number;
		arzoooProductId: number;
		title: string;
		arzooo_asn: string;
		model: string;
		description: string;
		imgs: IImage[];
		primaryImgPath: string;
		mrp: number;
		parentCategory: string;
		parentCategoryId: string;
		category: string;
		categoryId: string;
		subCategory: string;
		subCategoryId: string;
		brand: string;
		priority: number;
		specification: any[];
		attributeType: string;
		warranty: any[];
		supplierId: string | null;
		storePrice: number;
		quantity: number;
		storeId: number | null;
		sellerType: string | null;
		storeName: string | null;
		highlights: string;
		exchangeApplicable: boolean;
		countryOfOrigin: string;
		manufacturerDetails: string;
		importerDetails: string | null;
		packerDetails: string;
		deliveryDateRange: IDeliveryDateRange;
		isExchange: number;
		status?: 'success' | 'error';
		msg?: string;
	}
	interface ISuggestions {
		text: string;
		queryQuality: number;
	}
	interface ITrendingSuggestions {
		search: string;
		count: number;
		nbHits: number;
	}
}
