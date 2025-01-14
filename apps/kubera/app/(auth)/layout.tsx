'use client';

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ImagePlaceholder } from '@devas/ui';
import { useAppSelector } from '../../core/store';
import { Routes } from '../../core/primitives';

export default function AuthLayout({ children }: { children: ReactNode }) {
	const { loggedIn } = useAppSelector((state) => state.auth);
	const router = useRouter();

	useEffect(() => {
		if (loggedIn) {
			router.push(Routes.Home);
		}
	}, [loggedIn, router]);

	return (
		<section className="min-h-screen w-full overflow-hidden">
			<div className="grid grid-cols-3 overflow-hidden min-h-screen">
				<div className="col-span-2 bg-grey-4 flex items-center justify-center">
					<ImagePlaceholder
						src="/images/bg1.jpg"
						imageClasses="object-cover"
						containerClasses="w-full h-full"
					/>
				</div>
				<div className="col-span-1 bg-white flex flex-col">
					<div className="flex-col flex flex-1  justify-center px-24">
						<div className="flex items-center mb-24">
							<p className=" text-grey-text3 text-16">Welcome to</p>
							<ImagePlaceholder
								src="/images/logo.png"
								containerClasses="w-[120px] h-[42px]"
								imageClasses="object-cover"
							/>
						</div>
						{children}
					</div>
					<p className="text-12 py-24 px-16 text-center">
						By clicking you agree to our{' '}
						<Link href="/" className="font-semibold text-primary-1" target="_blank">
							privacy policy
						</Link>{' '}
						and{' '}
						<Link href="/" className="font-semibold text-primary-1" target="_blank">
							terms of use
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
