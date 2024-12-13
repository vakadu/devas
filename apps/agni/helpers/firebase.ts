// import { initializeApp, FirebaseApp } from 'firebase/app';
// import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';
// import { getPerformance } from 'firebase/performance';

// const firebaseConfig = {
// 	apiKey: process.env.NEXT_PUBLIC_API_KEY,
// 	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
// 	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
// 	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
// 	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
// 	appId: process.env.NEXT_PUBLIC_APP_ID,
// 	measurementId: process.env.NEXT_PUBLIC_MESSUREMENT_ID,
// };

// const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
// let analytics: Analytics | undefined;
// let performance;

// if (typeof window !== 'undefined') {
// 	isSupported().then((supported) => {
// 		if (supported) {
// 			analytics = getAnalytics(firebaseApp);
// 		}
// 	});
// 	performance = getPerformance(firebaseApp);
// }

// export { firebaseApp, analytics, performance };
