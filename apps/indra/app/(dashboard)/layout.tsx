'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '../../core/store';
import { Routes } from '../../core/primitives';
import { SidebarInset, SidebarProvider } from '@devas/ui';
import { AppSidebar, Header } from '../../core/ui';

export default function AuthLayout({ children }: { children: ReactNode }) {
	const { loggedIn } = useAppSelector((state) => state.auth);
	const router = useRouter();

	useEffect(() => {
		if (!loggedIn) {
			router.push(Routes.Login);
		}
	}, [loggedIn, router]);

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<Header />
				<main className="min-h-[calc(100vh-72px)] bg-greyBg">{children}</main>
				{/* <div className="flex flex-1 flex-col gap-4 p-4">
					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
					</div>
					<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
				</div> */}
			</SidebarInset>
		</SidebarProvider>
	);
}
