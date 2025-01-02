import { createContext, ReactNode, useContext, useState } from 'react';

interface IContextType {
	attributeKey: string | null;
	setAttributeKey: (attributeKey: string) => void;
	attributeName: string | null;
	setAttributeName: (attributeKey: string) => void;
	type: 'EDIT' | 'ADD' | null;
	setType: (type: 'EDIT' | 'ADD' | null) => void;
	showForm: boolean;
	toggleForm: (showForm: boolean) => void;
	attribute: ICatalougeTypes.ISpecifications | null;
	setAttribute: (attribute: ICatalougeTypes.ISpecifications | null) => void;
}

const EditProductContext = createContext<IContextType | undefined>(undefined);

export const EditProductProvider = ({ children }: { children: ReactNode }) => {
	const [attributeKey, setAttributeKey] = useState<string | null>(null);
	const [attributeName, setAttributeName] = useState<string | null>(null);
	const [type, setType] = useState<'EDIT' | 'ADD' | null>(null);
	const [showForm, toggleForm] = useState(false);
	const [attribute, setAttribute] = useState<ICatalougeTypes.ISpecifications | null>(null);

	return (
		<EditProductContext.Provider
			value={{
				attributeKey,
				setAttributeKey,
				attributeName,
				setAttributeName,
				type,
				setType,
				showForm,
				toggleForm,
				attribute,
				setAttribute,
			}}
		>
			{children}
		</EditProductContext.Provider>
	);
};

export const useEditProduct = () => {
	const context = useContext(EditProductContext);
	if (!context) {
		throw new Error('useEditProduct must be used inside EditProductProvider');
	}
	return context;
};
