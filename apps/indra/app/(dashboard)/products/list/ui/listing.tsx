'use client';

import { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

import { Spinner } from '@devas/ui';
import { useGetProductsList } from '../api';
import ListingTable from './table';
import Header from './header';

export default function Listing() {
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

	return (
		<div>
			<Header value={search} onChange={handleSearchChange} />
			<ListingTable
				data={productData?.pages.flatMap((page) => page?.data?.data?.products) || []}
			/>
			<div className="text-center flex flex-col gap-6" ref={ref}>
				{isFetchingNextPage && (
					<>
						<Spinner />
						<span className="text-12 font-medium">Fetching more products...</span>
					</>
				)}
			</div>
		</div>
	);
}
