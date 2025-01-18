'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';

import { useGetStoresList } from '../../api';
import { StoreListingContext, useStoreListingContext } from './context';
import { Button, Input } from '@devas/ui';
import { cn } from '@devas/utils';

interface IStoreListingProps {
	children: ReactNode;
	showInactive: 0 | 1;
	apiKey: string;
}

export function StoreListing({ children, showInactive, apiKey }: IStoreListingProps) {
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
			<div>{children}</div>
		</StoreListingContext.Provider>
	);
}

interface IStoreListingHeaderProps {
	className?: string;
}

export const StoreListingHeader = ({ className }: IStoreListingHeaderProps) => {
	const { value, handleSearchChange } = useStoreListingContext();

	return (
		<div
			className={cn(
				'flex justify-between items-center py-12 bg-white px-12 border-b border-grey-light',
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
		<div className={cn('bg-white rounded-12 overflow-y-scroll', className)} {...props}>
			{children}
		</div>
	);
};
