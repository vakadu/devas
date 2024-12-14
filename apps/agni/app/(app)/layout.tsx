import { redirect } from 'next/navigation';

import { Header } from '../../components';
import { prisma, Routes } from '../../helpers';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	const featureFlag = await prisma.feature_flags.findFirst({
		where: {
			id: 1,
		},
	});

	if (featureFlag?.coming_soon) {
		redirect(Routes.ComingSoon);
	}

	return (
		<main className="pt-[80px] flex flex-col">
			<Header />
			{children}
		</main>
	);
}
