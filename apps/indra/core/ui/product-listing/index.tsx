'use client';

import { useEffect, useState, useCallback, ReactNode, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';

import { Button, Input, Spinner } from '@devas/ui';
import { useGetProductsList } from '../../api/catalouge/get-product-list';
import { ProductListingContext, useProductListingContext } from './context';

export function ProductListing({ children }: { children: ReactNode }) {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [search, setSearchTerm] = useState('');
	const { data, fetchNextPage, isFetchingNextPage, isFetching } = useGetProductsList(search, 15);
	const [rowSelection, setRowSelection] = useState({});

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	const handleSearchChange = useCallback((value: string) => {
		setSearchTerm(value);
	}, []);

	const value = useMemo(
		() => ({
			value: search,
			handleSearchChange,
			data: data?.pages.flatMap((page) => page?.data?.data?.products) || [],
			isFetching,
			rowSelection,
			setRowSelection,
		}),
		[search, handleSearchChange, data?.pages, isFetching, rowSelection]
	);

	return (
		<ProductListingContext.Provider value={value}>
			<div>{children}</div>
			<div className="text-center flex flex-col gap-6" ref={ref}>
				{isFetchingNextPage && (
					<>
						<Spinner />
						<span className="text-12 font-medium">Fetching more products...</span>
					</>
				)}
			</div>
		</ProductListingContext.Provider>
	);
}

export const ListingHeader = () => {
	const { value, handleSearchChange } = useProductListingContext();

	return (
		<div className="flex justify-between py-12 bg-white mb-12 px-12 rounded-12">
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

export const ListingContent = ({ children }: { children: ReactNode }) => {
	return <div className="bg-white rounded-12">{children}</div>;
};
