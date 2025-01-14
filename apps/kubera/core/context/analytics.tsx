import { createContext, ReactNode, useContext } from 'react';
import { EventTracker } from '../helpers';

interface IAnalyticsContextType {
	analytics: EventTracker;
}

const AnalyticsContext = createContext<IAnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
	children: ReactNode;
	value: EventTracker;
}

export const AnalyticsProvider = ({ children, value }: AnalyticsProviderProps) => {
	return (
		<AnalyticsContext.Provider value={{ analytics: value }}>
			{children}
		</AnalyticsContext.Provider>
	);
};

export const useAnalytics = (): EventTracker => {
	const context = useContext(AnalyticsContext);
	if (!context) {
		throw new Error('useAnalytics must be used within an AnalyticsProvider');
	}
	return context.analytics;
};
