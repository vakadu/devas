'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { PaginationState } from '@tanstack/react-table';

import { StoreProductsListingContext, useStoreProductsListingContext } from './context';
import { Button, Input } from '@devas/ui';
import { cn } from '@devas/utils';
import { useGetStoresProductsList } from '../../api';
import { ProductSearch } from '../product-search';

interface IStoreProductsListingProps {
	children: ReactNode;
	showInactive: 0 | 1;
	apiKey: string;
	storeId: string;
	className?: string;
}

export function StoreProductsListing({
	children,
	showInactive,
	apiKey,
	storeId,
	className,
}: IStoreProductsListingProps) {
	const [search, setSearchTerm] = useState('');
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 15,
	});
	const { data, isFetching, refetch } = useGetStoresProductsList(
		search,
		apiKey,
		showInactive,
		pagination.pageIndex,
		pagination.pageSize
	);
	const [rowSelection, setRowSelection] = useState({});

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchTerm(value);
			setPagination({
				...pagination,
				pageIndex: 0,
			});
		},
		[pagination]
	);

	const value = useMemo(
		() => ({
			value: search,
			handleSearchChange,
			data: data?.data?.storeProducts || [],
			isFetching,
			rowSelection,
			setRowSelection,
			refetch,
			pagination,
			setPagination,
			storeId,
		}),
		[
			data?.data?.storeProducts,
			handleSearchChange,
			isFetching,
			pagination,
			refetch,
			rowSelection,
			search,
			storeId,
		]
	);

	return (
		<StoreProductsListingContext.Provider value={value}>
			<div className={cn(className)}>{children}</div>
		</StoreProductsListingContext.Provider>
	);
}

interface IStoreProductsListingHeaderProps {
	className?: string;
	storeId: string;
}

export const StoreProductsListingHeader = ({
	className,
	storeId,
}: IStoreProductsListingHeaderProps) => {
	const { value, handleSearchChange } = useStoreProductsListingContext();

	return (
		<div
			className={cn(
				'flex justify-between gap-32 items-center py-12 px-12 border-b',
				className
			)}
		>
			<div className="flex-1">
				<div className="flex items-center border-b px-12 w-[520px] relative">
					<Search className="mr-12 h-16 w-16 shrink-0 opacity-50" />
					<Input
						className={cn(
							'flex h-32 w-full rounded-md bg-transparent py-12 text-14 font-medium outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none pl-0',
							className
						)}
						type="search"
						placeholder="Search for store products..."
						value={value}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleSearchChange(e.target.value)
						}
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
			<div className="flex-1 flex justify-end">
				<ProductSearch storeId={storeId} />
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
		<div className={cn('overflow-y-scroll', className)} {...props}>
			{children}
		</div>
	);
};
