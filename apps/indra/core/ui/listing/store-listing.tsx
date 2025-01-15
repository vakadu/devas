'use client';

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';
import { RowSelectionState } from '@tanstack/react-table';

import { useGetStoresList } from '../../api';
import { StoreListingContext, useStoreListingContext } from './context';
import { Button, Input, Spinner } from '@devas/ui';
import { cn } from '@devas/utils';

interface IStoreListingProps {
	children: ReactNode;
	showInactive: 0 | 1;
	apiKey: string;
}

export function StoreListing({ children, showInactive, apiKey }: IStoreListingProps) {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [search, setSearchTerm] = useState<string>('');
	const { data, fetchNextPage, isFetchingNextPage, isFetching, refetch } = useGetStoresList(
		search,
		15,
		apiKey,
		showInactive
	);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

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
		<StoreListingContext.Provider value={value}>
			<div>{children}</div>
			<div className="text-center flex flex-col gap-6" ref={ref}>
				{isFetchingNextPage && (
					<>
						<Spinner />
						<span className="text-12 font-medium">Fetching more stores...</span>
					</>
				)}
			</div>
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
