'use client';
import { Check } from 'lucide-react';
import { Command as CommandPrimitive } from 'cmdk';

import {
	AutoSearch,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
	Skeleton,
} from '@devas/ui';
import { useState } from 'react';
import { useGetProductsList } from '../api';
import { cn } from '@devas/utils';
import { useCreateStoreProduct } from '../api/catalouge/create-store-product';
import { useStoreProductsListingContext } from './listing/context';

export function ProductSearch({ storeId }: { storeId?: string }) {
	const [searchValue, onSearchValueChange] = useState('');
	const [selectedValue, onSelectedValueChange] = useState<ICatalougeTypes.IProduct | null>(null);
	const [open, setOpen] = useState(false);
	const { data, isPending } = useGetProductsList(searchValue, 'products/search', 1, 0, 10);
	const productsData = data?.data?.products || ([] as ICatalougeTypes.IProduct[]);
	const { mutateAsync: createStoreProduct } = useCreateStoreProduct();
	const { refetch } = useStoreProductsListingContext();

	const onSelect = async (product: ICatalougeTypes.IProduct) => {
		onSelectedValueChange(product);
		if (storeId) {
			const payload = {
				storeId,
				productId: product?.productId,
				quantity: product?.quantity ? product?.quantity : 0,
				price: product?.price ? product?.price : 0,
				discount: 0,
				comment: '',
			};
			const response = await createStoreProduct(payload);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		}
		setOpen(false);
	};

	return (
		<AutoSearch
			placeholder="Search for Products..."
			searchValue={searchValue}
			onSearchValueChange={onSearchValueChange}
			open={open}
			setOpen={setOpen}
		>
			<CommandList>
				{isPending && (
					<CommandPrimitive.Loading>
						<div className="px-12 py-8">
							<Skeleton className="h-24 w-full" />
						</div>
					</CommandPrimitive.Loading>
				)}
				{productsData.length > 0 && !isPending && (
					<CommandGroup>
						{productsData.map((product) => {
							return (
								<CommandItem onSelect={() => onSelect(product)} key={product._id}>
									<Check
										className={cn(
											selectedValue?.productId === product.productId
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
									<span className="text-14 font-medium">{product.title}</span>
								</CommandItem>
							);
						})}
					</CommandGroup>
				)}
				{!isPending && <CommandEmpty>No Products found.</CommandEmpty>}
			</CommandList>
		</AutoSearch>
	);
}
