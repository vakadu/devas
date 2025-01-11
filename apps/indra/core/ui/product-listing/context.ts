import { createContext, useContext } from 'react';

export type IProductLsitingContextType = {
	value: string;
	handleSearchChange: (value: string) => void;
};

export const ProductLsitingContext = createContext<IProductLsitingContextType | undefined>(
	undefined
);

export const useProductListing = () => {
	const context = useContext(ProductLsitingContext);
	if (!context) {
		throw new Error('useProductListing must be used within a ProductLsitingContext.Provider');
	}
	return context;
};
