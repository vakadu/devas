'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Routes } from '../../helpers';
import { Header } from '../../components';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	// const data = value?.data();
	// const router = useRouter();

	// useEffect(() => {
	// 	if (data?.comingSoon) {
	// 		router.push(Routes.ComingSoon);
	// 	}
	// }, [data]);

	return (
		<main className="pt-[80px] flex flex-col">
			<Header />
			{children}
		</main>
	);
};

export default AppLayout;
