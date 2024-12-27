'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Toaster } from '@devas/ui';
import { persistor, store } from '../../core/store';
import { AppMobile, LoadingModal } from '../ui';
import { useResize } from '@devas/hooks';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const { isDesktop } = useResize();
	console.log(isDesktop);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{isDesktop ? children : <AppMobile />}
				<Toaster closeButton richColors position="bottom-left" />
				<LoadingModal />
			</PersistGate>
		</Provider>
	);
};

export default Providers;
