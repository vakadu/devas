import { PaginationState, RowSelectionState } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

export type IProductListingContextType = {
	value: string;
	handleSearchChange: (value: string) => void;
	data: ICatalougeTypes.IProduct[];
	isFetching: boolean;
	rowSelection: RowSelectionState;
	setRowSelection: (state: RowSelectionState) => void;
	refetch: () => void;
	pagination: PaginationState;
	setPagination: (state: PaginationState) => void;
};

export type IStoreListingContextType = {
	value: string;
	handleSearchChange: (value: string) => void;
	data: ICatalougeTypes.IStore[];
	isFetching: boolean;
	rowSelection: RowSelectionState;
	setRowSelection: (state: RowSelectionState) => void;
	refetch: () => void;
	pagination: PaginationState;
	setPagination: (state: PaginationState) => void;
};

export type IStoreProductsListingContextType = {
	value: string;
	handleSearchChange: (value: string) => void;
	data: ICatalougeTypes.IStoreProducts[];
	isFetching: boolean;
	rowSelection: RowSelectionState;
	setRowSelection: (state: RowSelectionState) => void;
	refetch: () => void;
	pagination: PaginationState;
	setPagination: (state: PaginationState) => void;
};

export const ProductListingContext = createContext<IProductListingContextType | undefined>(
	undefined
);

export const useProductListingContext = () => {
	const context = useContext(ProductListingContext);
	if (!context) {
		throw new Error(
			'useProductListingContext must be used within a ProductListingContext.Provider'
		);
	}
	return context;
};

export const StoreListingContext = createContext<IStoreListingContextType | undefined>(undefined);

export const useStoreListingContext = () => {
	const context = useContext(StoreListingContext);
	if (!context) {
		throw new Error(
			'useStoreListingContext must be used within a StoreListingContext.Provider'
		);
	}
	return context;
};

export const StoreProductsListingContext = createContext<
	IStoreProductsListingContextType | undefined
>(undefined);

export const useStoreProductsListingContext = () => {
	const context = useContext(StoreProductsListingContext);
	if (!context) {
		throw new Error(
			'useStoreProductsListingContext must be used within a StoreProductsListingContext.Provider'
		);
	}
	return context;
};
