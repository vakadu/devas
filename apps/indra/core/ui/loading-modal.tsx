'use client';

import { useSelector } from 'react-redux';

import { Spinner } from '@devas/ui';
import { RootState } from '../store';

export const LoadingModal = () => {
	const { isOpen, view, loadingText } = useSelector((state: RootState) => state.layout);

	if (!isOpen || view !== 'LOADING') return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black-1/80"></div>
			<div className="relative z-10 bg-white rounded-12 p-16 flex flex-col gap-12">
				<Spinner />
				<span className="text-14 font-medium">{loadingText}</span>
			</div>
		</div>
	);
};
