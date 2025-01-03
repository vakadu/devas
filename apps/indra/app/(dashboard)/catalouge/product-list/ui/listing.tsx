'use client'

import { ImageIcon, ListIcon, TableProperties } from 'lucide-react';
import Link from 'next/link';
import {
    ColumnDef,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import {
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@devas/ui';
import { Routes } from '../../../../../core/primitives';
import { cn } from '@devas/utils';
import { useGetProductsList } from '../api';

export default function Listing() {
    // const [sorting, setSorting] = useState<SortingState>([]);
    // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const { data: productData, isPending } = useGetProductsList();

    const columns: ColumnDef<ICatalougeTypes.IProduct>[] = [
        {
            accessorKey: 'productId',
            header: 'Product Id',
            cell: ({ row }) => {
                const id = parseInt(row.getValue('productId'));
                return (
                    <Link
                        className="hover:underline hover:text-primary"
                        href={`${Routes.CatalougeEditProduct}/${id}?type=product`}
                    >
                        {id}
                    </Link>
                );
            },
        },
        // {
        // 	accessorKey: 'name',
        // 	header: 'Product Name',
        // 	cell: ({ row }) => <div>{row.getValue('name')}</div>,
        // },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: ({ row }) => {
                const price = parseInt(row.getValue('price'));
                return <div>₹ {price.toLocaleString('en-IN')}</div>;
            },
        },
        {
            accessorKey: 'mrp',
            header: 'Mrp',
            cell: ({ row }) => {
                const mrp = parseInt(row.getValue('mrp'));
                return <div>₹ {mrp.toLocaleString('en-IN')}</div>;
            },
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
            cell: ({ row }) => <div>{row.getValue('quantity')}</div>,
        },
        {
            accessorKey: 'gstInPercent',
            header: 'GST',
            cell: ({ row }) => <div>{row.getValue('gstInPercent')}</div>,
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
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const id = row.getValue('productId');
                return (
                    <div className="flex gap-12">
                        <Tooltip>
                            <TooltipTrigger>
                                {' '}
                                <Link href={`${Routes.CatalougeEditProduct}/${id}?type=product`}>
                                    <ListIcon className="size-18" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit Product Details</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                {' '}
                                <Link href={`${Routes.CatalougeEditProduct}/${id}?type=images`}>
                                    <ImageIcon className="size-18" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit Images</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                {' '}
                                <Link href={`${Routes.CatalougeEditProduct}/${id}?type=attributes`}>
                                    <TableProperties className="size-18" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit Attributes</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: productData?.data?.products || [],
        columns,
        // onSortingChange: setSorting,
        // onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            // sorting,
            // columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    if (isPending) {
        return (
            <div className='flex justify-center items-center h-full'>
                <Spinner />
            </div>
        )
    }

    return (
        <Table>
            <TableHeader>
                {table?.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead className="text-16 p-16" key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table?.getRowModel()?.rows?.length ? (
                    table?.getRowModel()?.rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell className="px-16" key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center py-24">
                            <span>No results found.</span>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
