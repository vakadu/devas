import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';

import { cn } from '@devas/utils';
import { ProductListingTable } from '../../../../../../../core/ui';
import { Button, Checkbox } from '@devas/ui';
import { useProductListingContext } from '../../../../../../../core/ui/product-listing/context';
import { useGetProductById, useUpdateProductVariants } from '../../api';

export default function VariantProductTable() {
	const params = useParams();
	const { rowSelection, refetch, setRowSelection } = useProductListingContext();
	const selectedRows = Object.keys(rowSelection) as string[];
	const { mutateAsync: updateProductVariants, isPending } = useUpdateProductVariants(
		params?.id as string
	);
	const { data } = useGetProductById(params?.id as string);
	const varaintIds = useMemo(() => {
		return data?.data?.product?.productVariantIds || [];
	}, [data?.data?.product?.productVariantIds]);

	useEffect(() => {
		const initial = varaintIds.reduce((acc, id) => {
			acc[id] = true;
			return acc;
		}, {} as Record<string, boolean>);
		setRowSelection(initial);
	}, [setRowSelection, varaintIds]);

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
			{
				id: 'select',
				header: () => {
					const updateVariants = async () => {
						const payload = {
							productVariantIds: selectedRows,
						};
						const response = await updateProductVariants(payload);
						if (response.status === 'SUCCESS') {
							refetch();
						}
					};

					return (
						<Button
							onClick={updateVariants}
							disabled={selectedRows.length <= 0 || isPending}
							size="sm"
							loading={isPending}
							className="bg-orange px-12 hover:bg-orange/80"
						>
							Save
						</Button>
					);
				},
				cell: ({ row }) => {
					const currentVariant = row.original.productId;
					const isSelected = !!rowSelection[currentVariant];

					return (
						<Checkbox
							checked={isSelected || row.getIsSelected()}
							onCheckedChange={(value) => {
								const updatedSelection: RowSelectionState = {
									...rowSelection,
									[currentVariant]: Boolean(value),
								};
								if (!value) {
									delete updatedSelection[currentVariant];
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
				cell: ({ row }) => <div>{row.getValue('title')}</div>,
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
		[selectedRows, updateProductVariants]
	);

	return <ProductListingTable columns={columns} type="variant" id={params?.id as string} />;
}
