import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';

import { ProductListingTable } from '../../../../../../../core/ui';
import { Checkbox, Tooltip, TooltipContent, TooltipTrigger } from '@devas/ui';
import { useProductListingContext } from '../../../../../../../core/ui/listing/context';
import { useGetBannerImagesProducts } from '../api/get-banner-image-products';

export default function ColumsListing() {
	const params = useParams();
	const { rowSelection, setRowSelection } = useProductListingContext();
	const { data } = useGetBannerImagesProducts(params?.id as string, params?.imageId as string);

	useEffect(() => {
		const initialProducts = data?.data?.image?.productIds || [];
		if (initialProducts.length > 0) {
			const initial = initialProducts.reduce((acc, curr) => {
				acc[curr] = true;
				return acc;
			}, {} as Record<string, boolean>);
			setRowSelection(initial);
		}
	}, [data?.data?.image?.productIds, setRowSelection]);

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
			{
				id: 'select',
				cell: ({ row }) => {
					const currentProduct = row.original.productId;
					const isSelected = !!rowSelection[currentProduct];

					return (
						<Checkbox
							checked={isSelected || row.getIsSelected()}
							onCheckedChange={(value) => {
								const updatedSelection: RowSelectionState = {
									...rowSelection,
									[currentProduct]: Boolean(value),
								};
								if (!value) {
									delete updatedSelection[currentProduct];
								}
								setRowSelection(updatedSelection);
							}}
							aria-label="Select row"
						/>
					);
				},
			},
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => (
					<Tooltip>
						<TooltipTrigger>
							<div className="w-[340px] text-left line-clamp-2">
								{row.original.title}
							</div>
						</TooltipTrigger>
						<TooltipContent className="bg-white border border-grey-light rounded-8">
							<p className="text-black-1 text-14">{row.original.title}</p>
						</TooltipContent>
					</Tooltip>
				),
			},
			{
				accessorKey: 'category',
				header: 'Category',
				cell: ({ row }) => <div>{row.getValue('category')}</div>,
			},
			{
				accessorKey: 'subcategory',
				header: 'Sub Category',
				cell: ({ row }) => <div>{row.getValue('subcategory')}</div>,
			},
			{
				accessorKey: 'brand',
				header: 'Brand',
				cell: ({ row }) => <div>{row.getValue('brand')}</div>,
			},
		],
		[rowSelection, setRowSelection]
	);

	return <ProductListingTable columns={columns} type="banners" id={params?.id as string} />;
}
