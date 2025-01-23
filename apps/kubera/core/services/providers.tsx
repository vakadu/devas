'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster, TooltipProvider } from '@devas/ui';
import { persistor, store } from '../../core/store';
import { AppMobile, LoadingModal } from '../ui';
import { useResize } from '@devas/hooks';
import { AnalyticsProvider } from '../context';
import { EventTracker } from '../helpers';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const { isDesktop } = useResize();
	const queryClient = new QueryClient();
	// const analytics = new EventTracker();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					{/* <AnalyticsProvider value={analytics}> */}
					<TooltipProvider>{isDesktop ? children : <AppMobile />}</TooltipProvider>
					<Toaster closeButton richColors position="bottom-left" />
					<LoadingModal />
					{/* </AnalyticsProvider> */}
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
};

export default Providers;
