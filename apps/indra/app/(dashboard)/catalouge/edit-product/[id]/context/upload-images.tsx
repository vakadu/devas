import { createContext, ReactNode, useContext, useState } from 'react';

interface IContextType {
	showForm: boolean;
	toggleForm: (showForm: boolean) => void;
	attributeKey: string | null;
	setAttributeKey: (attributeKey: string) => void;
	attributeName: string | null;
	setAttributeName: (attributeKey: string) => void;
}

const UploadImagesContext = createContext<IContextType | undefined>(undefined);

export const UploadImagesProvider = ({ children }: { children: ReactNode }) => {
	const [showForm, toggleForm] = useState(false);
	const [attributeKey, setAttributeKey] = useState<string | null>(null);
	const [attributeName, setAttributeName] = useState<string | null>(null);

	return (
		<UploadImagesContext.Provider
			value={{
				showForm,
				toggleForm,
				attributeKey,
				setAttributeKey,
				attributeName,
				setAttributeName,
			}}
		>
			{children}
		</UploadImagesContext.Provider>
	);
};

export const useUploadImages = () => {
	const context = useContext(UploadImagesContext);
	if (!context) {
		throw new Error('useUploadImages must be used inside UploadImagesProvider');
	}
	return context;
};
