'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useAppSelector } from '../../core/store';
import { Routes } from '../../core/primitives';
import { SidebarInset, SidebarProvider } from '@devas/ui';
import { useAnalytics } from '../../core/context';
import { AppSidebar, Header } from '../../core/ui';

export default function AuthLayout({ children }: { children: ReactNode }) {
	const { loggedIn } = useAppSelector((state) => state.auth);
	const router = useRouter();
	// const pathname = usePathname();
	// const { trackEvent } = useAnalytics();

	useEffect(() => {
		if (!loggedIn) {
			router.push(Routes.Login);
		}
	}, [loggedIn, router]);

	// useEffect(() => {
	// 	trackEvent('PAGE_VIEW', { page: pathname });
	// }, [pathname]);

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<Header />
				<main className="min-h-[calc(100vh-72px)] bg-greyBg">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
