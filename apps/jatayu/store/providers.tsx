'use client';
import { Toaster } from '@devas/ui';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{children}
			<Toaster closeButton richColors position="bottom-left" />
		</>
	);
};

export default Providers;
