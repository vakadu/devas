'use client';

import { useEffect, useState, useCallback, ReactNode, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';

import { Button, Input, Spinner } from '@devas/ui';
import { useGetProductsList } from '../../api/catalouge/get-product-list';
import { ListingContext, useListingContext } from './context';
import { useGetStoresList } from '../../api/catalouge/get-store-list';
import { cn } from '@devas/utils';
import { useGetStoreProductsList } from '../../../app/(dashboard)/store/products/list/[id]/api/get-products';

export function ProductListing({ children }: { children: ReactNode }) {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [search, setSearchTerm] = useState('');
	const { data, fetchNextPage, isFetchingNextPage, isFetching, refetch } = useGetProductsList(
		search,
		15
	);
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
			refetch,
		}),
		[search, handleSearchChange, data?.pages, isFetching, rowSelection, refetch]
	);

	return (
		<ListingContext.Provider value={value}>
			<div>{children}</div>
			<div className="text-center flex flex-col gap-6" ref={ref}>
				{isFetchingNextPage && (
					<>
						<Spinner />
						<span className="text-12 font-medium">Fetching more products...</span>
					</>
				)}
			</div>
		</ListingContext.Provider>
	);
}

export function StoreListing({ children }: { children: ReactNode }) {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [search, setSearchTerm] = useState('');
	const { data, fetchNextPage, isFetchingNextPage, isFetching, refetch } = useGetStoresList(
		search,
		15
	);
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
			data: data?.pages.flatMap((page) => page?.data?.data?.stores) || [],
			isFetching,
			rowSelection,
			setRowSelection,
			refetch,
		}),
		[search, handleSearchChange, data?.pages, isFetching, rowSelection, refetch]
	);

	return (
		<ListingContext.Provider value={value}>
			<div>{children}</div>
			<div className="text-center flex flex-col gap-6" ref={ref}>
				{isFetchingNextPage && (
					<>
						<Spinner />
						<span className="text-12 font-medium">Fetching more products...</span>
					</>
				)}
			</div>
		</ListingContext.Provider>
	);
}

export function StoreProductsListing({
	children,
	storeId,
}: {
	children: ReactNode;
	storeId: string;
}) {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [search, setSearchTerm] = useState('');
	const { data, fetchNextPage, isFetchingNextPage, isFetching, refetch } =
		useGetStoreProductsList(search, 15, storeId);
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
			data: data?.pages.flatMap((page) => page?.data?.data?.storeProducts) || [],
			isFetching,
			rowSelection,
			setRowSelection,
			refetch,
		}),
		[search, handleSearchChange, data?.pages, isFetching, rowSelection, refetch]
	);

	return (
		<ListingContext.Provider value={value as any}>
			<div>{children}</div>
			<div className="text-center flex flex-col gap-6" ref={ref}>
				{isFetchingNextPage && (
					<>
						<Spinner />
						<span className="text-12 font-medium">Fetching more products...</span>
					</>
				)}
			</div>
		</ListingContext.Provider>
	);
}

export const ListingHeader = ({ type, className }: { type?: string; className?: string }) => {
	const { value, handleSearchChange } = useListingContext();

	return (
		<div
			className={cn('flex justify-between py-12 bg-white mb-12 px-12 rounded-12', className)}
		>
			<div className="flex-1">
				<div className="max-w-[320px] flex relative">
					<Input
						value={value}
						onChange={(e) => handleSearchChange(e.target.value)}
						placeholder={
							type === 'store' ? 'Search for stores' : 'Search for Products...'
						}
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
	return <div className="bg-white rounded-12 overflow-y-scroll">{children}</div>;
};
