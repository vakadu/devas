'use client';

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';

import { StoreProductsListingContext, useStoreProductsListingContext } from './context';
import { Button, Input, Spinner } from '@devas/ui';
import { cn } from '@devas/utils';
import { useGetStoreProductsList } from '../../api';

interface IStoreProductsListingProps {
	children: ReactNode;
	showInactive: 0 | 1;
	apiKey: string;
	storeId: string;
}

export function StoreProductsListing({
	children,
	showInactive,
	apiKey,
	storeId,
}: IStoreProductsListingProps) {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [search, setSearchTerm] = useState('');
	const { data, fetchNextPage, isFetchingNextPage, isFetching, refetch } =
		useGetStoreProductsList(search, 15, storeId, apiKey);
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
		<StoreProductsListingContext.Provider value={value}>
			<div>{children}</div>
			<div className="text-center flex flex-col gap-6" ref={ref}>
				{isFetchingNextPage && (
					<>
						<Spinner />
						<span className="text-12 font-medium">Fetching more products...</span>
					</>
				)}
			</div>
		</StoreProductsListingContext.Provider>
	);
}

interface IStoreProductsListingHeaderProps {
	className?: string;
}

export const StoreProductsListingHeader = ({ className }: IStoreProductsListingHeaderProps) => {
	const { value, handleSearchChange } = useStoreProductsListingContext();

	return (
		<div
			className={cn(
				'flex justify-between items-center py-12 bg-white mb-12 px-12 rounded-12',
				className
			)}
		>
			<div className="flex-1">
				<div className="max-w-[320px] flex relative">
					<Input
						value={value}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleSearchChange(e.target.value)
						}
						placeholder="Search for stores..."
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

interface IStoreProductListingContentProps {
	children: ReactNode;
	className?: string;
}

export const StoreProductsListingContent = ({
	children,
	className,
	...props
}: IStoreProductListingContentProps) => {
	return (
		<div className={cn('bg-white rounded-12 overflow-y-scroll', className)} {...props}>
			{children}
		</div>
	);
};
