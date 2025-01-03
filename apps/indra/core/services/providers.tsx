'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster, TooltipProvider } from '@devas/ui';
import { persistor, store } from '../../core/store';
import { AppMobile, LoadingModal } from '../ui';
import { useResize } from '@devas/hooks';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const { isDesktop } = useResize();
	const queryClient = new QueryClient();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<TooltipProvider>{isDesktop ? children : <AppMobile />}</TooltipProvider>
					<Toaster closeButton richColors position="bottom-left" />
					<LoadingModal />
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
};

export default Providers;
