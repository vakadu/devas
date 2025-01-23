'use client';

import { useState } from 'react';

import { useGetBanners } from '../api/get-banners';
import ListingTable from './table';
import Header from './header';
import { PaginationState } from '@tanstack/react-table';

export default function Listing() {
	const [search, setSearchTerm] = useState('');
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 15,
	});
	const { data, isPending } = useGetBanners(
		search.length > 2 ? search : '',
		pagination.pageSize,
		pagination.pageIndex
	);

	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
	};

	return (
		<div className="bg-white shadow-card1 rounded-8">
			<Header value={search} onChange={handleSearchChange} />
			<ListingTable
				isLoading={isPending}
				data={data?.data?.banners || []}
				pagination={pagination}
				setPagination={setPagination}
			/>
		</div>
	);
}
