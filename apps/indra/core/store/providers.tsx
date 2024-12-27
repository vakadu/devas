'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../store/index';
import { Toaster } from '@devas/ui';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
				<Toaster closeButton richColors position="bottom-left" />
			</PersistGate>
		</Provider>
	);
};

export default Providers;
