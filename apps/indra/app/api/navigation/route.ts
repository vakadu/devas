import { NextResponse } from 'next/server';

import { Routes } from '../../../core/primitives';

const data: ICommonTypes.INavigationItem[] = [
	{
		id: 1,
		type: 'link',
		path: '/home',
		title: 'Home',
		icon: 'House',
	},
	{
		id: 2,
		type: 'menu',
		path: '/catalouge',
		title: 'Catalouge',
		icon: 'ShoppingBasket',
		items: [
			{
				id: 3,
				type: 'link',
				path: `${Routes.CatalougeAddProduct}`,
				title: 'Add Product',
			},
			{
				id: 4,
				type: 'link',
				path: `${Routes.CatalougeProductList}`,
				title: 'Products List',
			},
		],
	},
];

export async function GET(request: Request) {
	return NextResponse.json({ data });
}
