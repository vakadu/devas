'use client';

import { createContext, useContext } from 'react';

export type ISearchSelectContextType = {
	show: boolean;
	setShow: (show: boolean) => void;
};

export const SearchSelectContext = createContext<ISearchSelectContextType | undefined>(undefined);

export const useSearchSelectTrigger = () => {
	const context = useContext(SearchSelectContext);
	if (!context) {
		throw new Error(
			'useSearchSelectTrigger must be used within a SearchSelectContext.Provider'
		);
	}

	return context;
};
