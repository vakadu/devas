'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { SearchSelectContent, SearchSelectInput, SearchSelectOption } from '@devas/ui';
import { useGetProductsList } from '../api/catalouge/get-product-list';

export function SearchSelectProducts({
	products,
	handleProduct,
}: {
	products: ICatalougeTypes.IProduct[];
	handleProduct: (product: ICatalougeTypes.IProduct) => void;
}) {
	const [value, setValue] = useState('');
	const { data, isFetchingNextPage, fetchNextPage } = useGetProductsList(value, 15);
	const productsData = data?.pages.flatMap((page) => page?.data?.data?.products) || [];
	const { ref, inView } = useInView({
		threshold: 0,
	});

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	const onChange = (val: string) => {
		setValue(val);
	};

	const checkSelected = (id: string) => {
		return products.some((product) => product._id === id);
	};

	return (
		<SearchSelectContent>
			<SearchSelectInput value={value} onChange={onChange} />
			<div className="">
				{productsData?.map((product) => {
					const isSelected = checkSelected(product._id);
					return (
						<SearchSelectOption
							onClick={() => handleProduct(product)}
							key={product._id}
							disabled={isSelected}
							className={isSelected ? 'bg-grey-2' : ''}
						>
							{product.title}
						</SearchSelectOption>
					);
				})}
			</div>
			<div className="text-center flex flex-col gap-6" ref={ref}>
				{isFetchingNextPage && (
					<span className="text-12 font-medium">Fetching more products...</span>
				)}
			</div>
		</SearchSelectContent>
	);
}
