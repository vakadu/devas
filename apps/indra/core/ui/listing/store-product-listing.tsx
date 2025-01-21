'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import { PlusIcon, X } from 'lucide-react';
import { PaginationState } from '@tanstack/react-table';

import { StoreProductsListingContext, useStoreProductsListingContext } from './context';
import { Button, Input } from '@devas/ui';
import { cn } from '@devas/utils';
import { useGetStoresProductsList } from '../../api';
import Link from 'next/link';
import { Routes } from '../../primitives';

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
	className
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
			storeId
		}),
		[
			data?.data?.storeProducts,
			handleSearchChange,
			isFetching,
			pagination,
			refetch,
			rowSelection,
			search,
			storeId
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
}

export const StoreProductsListingHeader = ({ className }: IStoreProductsListingHeaderProps) => {
	const { value, handleSearchChange, storeId } = useStoreProductsListingContext();

	return (
		<div
			className={cn(
				'flex justify-between items-center py-12 px-12 border-b border-grey-light',
				className
			)}
		>
			<div className="flex-1">
				<div className="w-[320px] flex relative">
					<Input
						value={value}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleSearchChange(e.target.value)
						}
						placeholder="Search for products..."
						type="search"
						className="pr-[24px] h-32 rounded-8 text-14 py-4"
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
				<Button variant="outline" size="lg">
					<Link className='flex gap-6 items-center justify-center' href={`${Routes.AddStoreProduct}/${storeId}?type=product`}>
						<PlusIcon className="!size-16" />
						<span className="text-14 font-medium">Add a Product</span>
					</Link>
				</Button>
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
