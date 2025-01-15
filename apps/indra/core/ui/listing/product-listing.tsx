'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';

import { ProductListingContext, useProductListingContext } from './context';
import { Button, Input } from '@devas/ui';
import { cn } from '@devas/utils';
import { useGetProductsList } from '../../api/catalouge/get-products-list';

interface IProductListingProps {
	children: ReactNode;
	showInactive: 0 | 1;
	apiKey: string;
}

export function ProductListing({ children, showInactive, apiKey }: IProductListingProps) {
	const [search, setSearchTerm] = useState<string>('');
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 15,
	});
	const { data, isFetching, refetch } = useGetProductsList(
		search,
		apiKey,
		showInactive,
		pagination.pageIndex,
		pagination.pageSize
	);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const handleSearchChange = useCallback((value: string) => {
		setSearchTerm(value);
	}, []);

	const value = useMemo(
		() => ({
			value: search,
			handleSearchChange,
			data: data?.data?.products || [],
			isFetching,
			rowSelection,
			setRowSelection,
			refetch,
			pagination,
			setPagination,
		}),
		[
			data?.data?.products,
			handleSearchChange,
			isFetching,
			pagination,
			refetch,
			rowSelection,
			search,
		]
	);

	return (
		<ProductListingContext.Provider value={value}>
			<div>{children}</div>
		</ProductListingContext.Provider>
	);
}

interface IProductListingHeaderProps {
	className?: string;
}

export const ProductListingHeader = ({ className }: IProductListingHeaderProps) => {
	const { value, handleSearchChange } = useProductListingContext();

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

interface IProductListingContentProps {
	children: ReactNode;
	className?: string;
}

export const ProductListingContent = ({
	children,
	className,
	...props
}: IProductListingContentProps) => {
	return (
		<div className={cn('overflow-y-scroll', className)} {...props}>
			{children}
		</div>
	);
};
