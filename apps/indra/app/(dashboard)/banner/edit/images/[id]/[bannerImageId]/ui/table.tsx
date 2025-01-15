import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { useMemo, useEffect, useCallback } from 'react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@devas/utils';
import { Button, Checkbox, Tooltip, TooltipContent, TooltipTrigger } from '@devas/ui';
import { Routes } from '../../../../../../../../core/primitives';
import { useAnalytics } from '../../../../../../../../core/context';
import { ProductListingTable } from '../../../../../../../../core/ui';
import { useGetBannerImageDetails } from '../api/get-image-details';
import { useProductListingContext } from '../../../../../../../../core/ui/listing/context';

export default function ColumnsListing({ handleChange }: { handleChange: (type: string) => void }) {
	const { trackEvent } = useAnalytics();
	const params = useParams();
	const { setRowSelection, rowSelection } = useProductListingContext();
	const router = useRouter();
	const pathname = usePathname();
	const sParams = useSearchParams();
	const { data } = useGetBannerImageDetails(
		params?.id as string,
		params?.bannerImageId as string
	);
	const productIds = useMemo(() => {
		return sParams.get('products')?.split(',') || [];
	}, [sParams]);

	useEffect(() => {
		const updateSelection = productIds.reduce((acc, id) => {
			acc[id] = true;
			return acc;
		}, {} as RowSelectionState);
		setRowSelection(updateSelection);
	}, [productIds, setRowSelection]);

	const handleUpdateUrl = useCallback(
		(ids: string[]) => {
			const searchParams = new URLSearchParams(sParams.toString());
			if (ids.length === 0) {
				searchParams.delete('products');
			} else {
				searchParams.set('products', ids.join(','));
			}
			router.replace(`${pathname}?${searchParams.toString()}`, { scroll: false });
		},
		[pathname, router, sParams]
	);

	useEffect(() => {
		if (data?.data?.image) {
			handleUpdateUrl(data?.data?.image.productIds);
		}
	}, [data?.data?.image, handleUpdateUrl]);

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
			{
				id: 'select',
				header: () => {
					return (
						<Button
							onClick={() => handleChange('details')}
							disabled={productIds && productIds.length <= 0}
							size="sm"
							className="bg-orange px-12 hover:bg-orange/80"
						>
							Done
						</Button>
					);
				},
				cell: ({ row }) => {
					const currentProductId = row.original.productId;
					const isSelected = !!rowSelection[currentProductId];

					return (
						<Checkbox
							checked={isSelected || row.getIsSelected()}
							onCheckedChange={(value) => {
								const updatedSelection: RowSelectionState = {
									...rowSelection,
									[currentProductId]: Boolean(value),
								};
								if (!value) {
									delete updatedSelection[currentProductId];
								}
								const ids = Object.keys(updatedSelection);
								handleUpdateUrl(ids);
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
				cell: ({ row }) => {
					const handleEvents = async () => {
						await trackEvent('EDIT_CATALOUGE_PRODUCT', {
							path: `${Routes.EditProduct}/${row.original.productId}?type=product`,
							productId: row.original.productId,
						});
					};

					return (
						<Tooltip>
							<TooltipTrigger>
								<Link
									className="hover:underline hover:text-primary w-[340px] line-clamp-2 text-16 text-left"
									href={`${Routes.EditProduct}/${row.original.productId}?type=product`}
									onClick={handleEvents}
								>
									{row.original.title}
								</Link>
							</TooltipTrigger>
							<TooltipContent className="bg-white border border-grey-light rounded-8">
								<p className="text-black-1 text-14">{row.original.title}</p>
							</TooltipContent>
						</Tooltip>
					);
				},
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
			{
				accessorKey: 'active',
				header: 'Status',
				cell: ({ row }) => {
					const status = row.getValue('active');
					return (
						<div
							className={cn(
								'rounded-full inline-block py-4 !font-semibold px-12 !text-12',
								status ? 'bg-primary text-white' : 'bg-red-1 text-white'
							)}
						>
							{status ? 'Active' : 'Inactive'}
						</div>
					);
				},
			},
		],
		[rowSelection, setRowSelection, trackEvent]
	);

	return <ProductListingTable columns={columns} type="product-list" id={params?.id as string} />;
}
