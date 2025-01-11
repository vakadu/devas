'use client';

import { useEffect, useState, useCallback, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';

import { Button, Input } from '@devas/ui';
import { useGetProductsList } from '../../api/catalouge/get-product-list';
import { ProductLsitingContext, useProductListing } from './context';

export function ProductListing({ children }: { children: ReactNode }) {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [search, setSearchTerm] = useState('');
	const { data: productData, fetchNextPage, isFetchingNextPage } = useGetProductsList(search, 15);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	const handleSearchChange = useCallback((value: string) => {
		setSearchTerm(value);
	}, []);

	const value = {
		value: search,
		handleSearchChange,
	};

	return (
		<ProductLsitingContext.Provider value={value}>
			<div>{children}</div>
		</ProductLsitingContext.Provider>
	);
}

export const ListingHeader = () => {
	const { value, handleSearchChange } = useProductListing();

	return (
		<div className="flex justify-between py-12">
			<div className="flex-1">
				<div className="max-w-[320px] flex relative">
					<Input
						value={value}
						onChange={(e) => handleSearchChange(e.target.value)}
						placeholder="Search for Products..."
						type="search"
						className="pr-[24px]"
					/>
					{value.length > 0 && (
						<Button
							size="icon"
							variant="ghost"
							className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
							onClick={() => handleSearchChange('')}
						>
							<X className="!size-16 text-red-1" />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};
