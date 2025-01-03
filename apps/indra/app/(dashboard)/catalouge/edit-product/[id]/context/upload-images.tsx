import { createContext, ReactNode, useContext, useState } from 'react';

interface IContextType {
	showForm: boolean;
	toggleForm: (showForm: boolean) => void;
}

const UploadImagesContext = createContext<IContextType | undefined>(undefined);

export const UploadImagesProvider = ({ children }: { children: ReactNode }) => {
	const [showForm, toggleForm] = useState(false);

	return (
		<UploadImagesContext.Provider
			value={{
				showForm,
				toggleForm,
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
