import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { useGetProductById } from '../../api';
import { useGetProductsByIds } from '../../../../../../../core/api';
import { ProductListingTable } from '../../../../../../../core/ui';

export default function SelectedVariants() {
	const params = useParams();
	const { data } = useGetProductById(params?.id as string);
	const varaintIds = useMemo(() => {
		return data?.data?.product?.productVariantIds || [];
	}, [data?.data?.product?.productVariantIds]);
	const { data: variantData } = useGetProductsByIds(varaintIds.join(','));

	// const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
	// () => [
	// 	{
	// 		id: 'select',
	// 		header: () => {
	// 			const updateVariants = async () => {
	// 				const payload = {
	// 					productVariantIds: selectedRows,
	// 				};
	// 				const response = await updateProductVariants(payload);
	// 				if (response.status === 'SUCCESS') {
	// 					refetch();
	// 				}
	// 			};

	// 			return (
	// 				<Button
	// 					onClick={updateVariants}
	// 					disabled={selectedRows.length <= 0 || isPending}
	// 					size="sm"
	// 					loading={isPending}
	// 					className="bg-orange px-12 hover:bg-orange/80"
	// 				>
	// 					Save
	// 				</Button>
	// 			);
	// 		},
	// 		cell: ({ row }) => {
	// 			const currentVariant = row.original.productId;
	// 			const isSelected = !!rowSelection[currentVariant];

	// 			return (
	// 				<Checkbox
	// 					checked={isSelected || row.getIsSelected()}
	// 					onCheckedChange={(value) => {
	// 						const updatedSelection: RowSelectionState = {
	// 							...rowSelection,
	// 							[currentVariant]: Boolean(value),
	// 						};
	// 						if (!value) {
	// 							delete updatedSelection[currentVariant];
	// 						}
	// 						setRowSelection(updatedSelection);
	// 					}}
	// 					aria-label="Select row"
	// 				/>
	// 			);
	// 		},
	// 	},
	// 	{
	// 		accessorKey: 'title',
	// 		header: 'Title',
	// 		cell: ({ row }) => (
	// 			<Tooltip>
	// 				<TooltipTrigger>
	// 					<div className="w-[340px] text-left line-clamp-2">
	// 						{row.original.title}
	// 					</div>
	// 				</TooltipTrigger>
	// 				<TooltipContent className="bg-white border border-grey-light rounded-8">
	// 					<p className="text-black-1 text-14">{row.original.title}</p>
	// 				</TooltipContent>
	// 			</Tooltip>
	// 		),
	// 	},
	// 	{
	// 		accessorKey: 'category',
	// 		header: 'Category',
	// 		cell: ({ row }) => <div>{row.getValue('category')}</div>,
	// 	},
	// 	{
	// 		accessorKey: 'subcategory',
	// 		header: 'Sub Category',
	// 		cell: ({ row }) => <div>{row.getValue('subcategory')}</div>,
	// 	},
	// 	{
	// 		accessorKey: 'brand',
	// 		header: 'Brand',
	// 		cell: ({ row }) => <div>{row.getValue('brand')}</div>,
	// 	},
	// 	{
	// 		accessorKey: 'active',
	// 		header: 'Status',
	// 		cell: ({ row }) => {
	// 			const status = row.getValue('active');
	// 			return (
	// 				<div
	// 					className={cn(
	// 						'rounded-full inline-block py-4 !font-semibold px-12 !text-12',
	// 						status ? 'bg-primary text-white' : 'bg-red-1 text-white'
	// 					)}
	// 				>
	// 					{status ? 'Active' : 'Inactive'}
	// 				</div>
	// 			);
	// 		},
	// 	},
	// ],
	// []
	// );

	// return <ProductListingTable columns={columns} type="variant" id={params?.id as string} />;

	return null;
}
