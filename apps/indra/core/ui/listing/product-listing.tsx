'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';
import { motion } from 'framer-motion';

import { ProductListingContext, useProductListingContext } from './context';
import { Button, Input } from '@devas/ui';
import { cn, slideDown } from '@devas/utils';
import { useGetProductsList } from '../../api/catalouge/get-products-list';

interface IProductListingProps {
	children: ReactNode;
	showInactive: 0 | 1;
	apiKey: string;
	className?: string;
}

export function ProductListing({
	children,
	showInactive,
	apiKey,
	className,
}: IProductListingProps) {
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
			data: data?.data?.products || [],
			isFetching,
			rowSelection,
			setRowSelection,
			refetch,
			pagination,
			setPagination,
			apiKey,
		}),
		[
			apiKey,
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
			<div className={cn(className)}>{children}</div>
		</ProductListingContext.Provider>
	);
}

interface IProductListingHeaderProps {
	className?: string;
	children?: ReactNode;
}

export const ProductListingHeader = ({ className, children }: IProductListingHeaderProps) => {
	const { value, handleSearchChange, pagination, setPagination, rowSelection, setRowSelection } =
		useProductListingContext();
	const productIds = Object.keys(rowSelection) || [];

	const handleClear = () => {
		handleSearchChange('');
		setPagination({
			...pagination,
			pageIndex: 0,
		});
	};

	const handleClearSelection = () => {
		setRowSelection({});
	};

	return (
		<div>
			<div
				className={cn('flex justify-between items-center py-12 px-12 border-b', className)}
			>
				<div className="flex-1">
					{children}
					{productIds.length > 0 && (
						<motion.div
							initial="initial"
							animate="animate"
							exit="exit"
							variants={slideDown}
							className="flex gap-16 items-center"
						>
							<span className="text-14 font-medium">
								Selected {productIds.length} row(s)
							</span>
							<Button
								onClick={handleClearSelection}
								variant="ghost"
								size="sm"
								className="text-14"
							>
								Clear Selection
							</Button>
						</motion.div>
					)}
				</div>
				<div className="flex-1 flex justify-end">
					<div className="flex items-center border-b px-12 w-[320px] relative">
						<Search className="mr-12 h-16 w-16 shrink-0 opacity-50" />
						<Input
							className={cn(
								'flex h-32 w-full rounded-md bg-transparent py-12 text-14 font-medium outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none pl-0',
								className
							)}
							type="search"
							placeholder="Search for products..."
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
