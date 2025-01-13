import { RowSelectionState } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

export type IListingContextType = {
	value: string;
	handleSearchChange: (value: string) => void;
	data: ICatalougeTypes.IProduct[] | ICatalougeTypes.IStore[];
	isFetching: boolean;
	rowSelection: RowSelectionState;
	setRowSelection: (state: RowSelectionState) => void;
	refetch: () => void;
};

export const ListingContext = createContext<IListingContextType | undefined>(undefined);

export const useListingContext = () => {
	const context = useContext(ListingContext);
	if (!context) {
		throw new Error('useProductListing must be used within a ProductLsitingContext.Provider');
	}
	return context;
};
