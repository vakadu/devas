import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { PlusIcon, X } from 'lucide-react';
import { RowSelectionState } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

import { useGetProductsList } from '../../api';
import { ProductListingContext, useProductListingContext } from './context';
import { Button, Input, Spinner } from '@devas/ui';
import { cn } from '@devas/utils';
import { Routes } from '../../primitives';

interface IProductListingProps {
	children: ReactNode;
	showInactive: 0 | 1;
	apiKey: string;
}

export function ProductListing({ children, showInactive, apiKey }: IProductListingProps) {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [search, setSearchTerm] = useState<string>('');
	const { data, fetchNextPage, isFetchingNextPage, isFetching, refetch } = useGetProductsList(
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
			data: data?.pages.flatMap((page) => page?.data?.data?.products) || [],
			isFetching,
			rowSelection,
			setRowSelection,
			refetch,
		}),
		[search, handleSearchChange, data?.pages, isFetching, rowSelection, refetch]
	);

	return (
		<ProductListingContext.Provider value={value}>
			<div>{children}</div>
			<div className="text-center flex flex-col gap-6" ref={ref}>
				{isFetchingNextPage && (
					<>
						<Spinner />
						<span className="text-12 font-medium">Fetching more products...</span>
					</>
				)}
			</div>
		</ProductListingContext.Provider>
	);
}

interface IProductListingHeaderProps {
	className?: string;
}

export const ProductListingHeader = ({ className }: IProductListingHeaderProps) => {
	const { value, handleSearchChange } = useProductListingContext();
	const router = useRouter();

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
			<div className="flex-1 flex justify-end">
				<Button
					onClick={() => router.push(Routes.AddProduct)}
					size="sm"
					variant="secondary"
					className="py-10 px-12"
				>
					<PlusIcon className="!size-16" />
					<span className="font-medium text-14">Add Product</span>
				</Button>
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
		<div className={cn('bg-white rounded-12 overflow-y-scroll', className)} {...props}>
			{children}
		</div>
	);
};
