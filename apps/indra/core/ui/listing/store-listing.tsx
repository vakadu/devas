'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';

import { useGetStoresList } from '../../api';
import { StoreListingContext, useStoreListingContext } from './context';
import { Button, Input } from '@devas/ui';
import { cn } from '@devas/utils';

interface IStoreListingProps {
	children: ReactNode;
	showInactive: 0 | 1;
	apiKey: string;
	className?: string;
}

export function StoreListing({ children, showInactive, apiKey, className }: IStoreListingProps) {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 15,
	});
	const [search, setSearchTerm] = useState<string>('');
	const { data, isFetching, refetch } = useGetStoresList(
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
			data: data?.data?.stores || [],
			isFetching,
			rowSelection,
			setRowSelection,
			refetch,
			pagination,
			setPagination,
		}),
		[
			data?.data?.stores,
			handleSearchChange,
			isFetching,
			pagination,
			refetch,
			rowSelection,
			search,
		]
	);

	return (
		<StoreListingContext.Provider value={value}>
			<div className={cn(className)}>{children}</div>
		</StoreListingContext.Provider>
	);
}

interface IStoreListingHeaderProps {
	className?: string;
}

export const StoreListingHeader = ({ className }: IStoreListingHeaderProps) => {
	const { value, handleSearchChange } = useStoreListingContext();

	return (
		<div className={cn('flex justify-between items-center py-12 px-12 border-b', className)}>
			<div className="flex-1">
				<div className="flex items-center border-b px-12 w-[320px] relative">
					<Search className="mr-12 h-16 w-16 shrink-0 opacity-50" />
					<Input
						className={cn(
							'flex h-32 w-full rounded-md bg-transparent py-12 text-14 font-medium outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none pl-0',
							className
						)}
						type="search"
						placeholder="Search for stores..."
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
	);
};

interface IStoreListingContentProps {
	children: ReactNode;
	className?: string;
}

export const StoreListingContent = ({
	children,
	className,
	...props
}: IStoreListingContentProps) => {
	return (
		<div className={cn('overflow-y-scroll', className)} {...props}>
			{children}
		</div>
	);
};
