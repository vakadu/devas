'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Spinner } from '@devas/ui';
import { useGetBanners } from '../api/get-banners';
import ListingTable from './table';
import Header from './header';

export default function Listing() {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [search, setSearchTerm] = useState('');
	const { data, fetchNextPage, isFetchingNextPage, isPending } = useGetBanners(
		search.length > 2 ? search : '',
		15
	);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
	};

	return (
		<div>
			<Header value={search} onChange={handleSearchChange} />
			<ListingTable
				isLoading={isPending}
				data={data?.pages.flatMap((page) => page?.data?.data?.banners) || []}
			/>
			<div className="text-center flex flex-col gap-6" ref={ref}>
				{isFetchingNextPage && (
					<>
						<Spinner />
						<span className="text-12 font-medium">Fetching more banners...</span>
					</>
				)}
			</div>
		</div>
	);
}
