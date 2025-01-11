import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { SearchSelectContent, SearchSelectInput, SearchSelectOption } from '@devas/ui';
import { useGetProductsList } from '../../../../products/list/api';

export default function SearchProducts() {
	const [value, setValue] = useState('');
	const { data, isFetchingNextPage, fetchNextPage } = useGetProductsList(value, 5);
	const products = data?.pages.flatMap((page) => page?.data?.data?.products) || [];
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

	return (
		<SearchSelectContent>
			<SearchSelectInput value={value} onChange={onChange} />
			<div className="">
				{products?.map((product) => {
					return (
						<SearchSelectOption key={product._id}>{product.title}</SearchSelectOption>
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
