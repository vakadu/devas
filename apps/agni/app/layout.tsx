import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import dynamic from 'next/dynamic';

import '../assets/css/global.css';

const Providers = dynamic(() => import('../store/providers'));

export const metadata = {
	title: 'Biggr',
	description: 'Biggr',
	themeColor: '#ffffff',
	icons: {
		icon: [
			{ url: '/favicon/icon-192.png', sizes: '192x192' },
			{ url: '/favicon/icon-512.png', sizes: '512x512' },
			{
				url: '/favicon/icon-192-maskable.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				url: '/favicon/icon-512-maskable.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
		apple: '/favicon/apple-touch-icon.png',
		shortcut: '/favicon/favicon.ico',
	},
};

const sathoshi = localFont({
	src: [
		{
			path: '../assets/fonts/sathoshi/Satoshi-Light.otf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Medium.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Bold.otf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Black.otf',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-sathoshi',
	display: 'swap',
	preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${sathoshi.variable} font-sathoshi scroll-smooth`}>
			<body>
				<Providers>{children}</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
