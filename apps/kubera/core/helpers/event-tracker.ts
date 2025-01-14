import axios from 'axios';

import { store } from '../store';
import { IAnalyticsEventName } from './analytics-events';

export class EventTracker {
	// private userId: string;
	// private role: string;
	// private mobile: string;

	// constructor() {
	// 	const state = store.getState();
	// 	this.userId = state?.auth?.userId || '';
	// 	this.role = state?.auth?.role || '';
	// 	this.mobile = state?.auth?.mobile || '';
	// 	console.log(state?.auth?.userId);
	// }

	/**
	 * Tracks an analytics event and saves it to the database.
	 * @param eventName - The name of the event.
	 * @param metadata - Additional metadata for the event.
	 * @param eventType - Optional type of the event.
	 */
	async trackEvent(
		eventName: IAnalyticsEventName,
		metadata: Record<string, unknown> = {},
		eventType?: string
	): Promise<void> {
		const state = store.getState();
		try {
			await axios.post('/api/analytics', {
				userId: state.auth.userId,
				role: state.auth.role,
				mobile: state.auth.mobile,
				eventName,
				eventType: eventType ? eventType : '',
				source: 'web',
				metadata,
			});
		} catch (error) {
			console.error('Failed to track event:', error);
		}
	}

	/**
	 * Clears user data from the tracker.
	 */
	// clearUserData() {}
}
