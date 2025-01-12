import { RowSelectionState } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

export type IProductListingContextType = {
	value: string;
	handleSearchChange: (value: string) => void;
	data: ICatalougeTypes.IProduct[];
	isFetching: boolean;
	rowSelection: RowSelectionState;
	setRowSelection: (state: RowSelectionState) => void;
};

export const ProductListingContext = createContext<IProductListingContextType | undefined>(
	undefined
);

export const useProductListingContext = () => {
	const context = useContext(ProductListingContext);
	if (!context) {
		throw new Error('useProductListing must be used within a ProductLsitingContext.Provider');
	}
	return context;
};
