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
		path: '/products',
		title: 'Products',
		icon: 'ShoppingBasket',
		items: [
			{
				id: 3,
				type: 'link',
				path: `${Routes.AddProduct}`,
				title: 'Add Product',
			},
			{
				id: 4,
				type: 'link',
				path: `${Routes.ProductList}`,
				title: 'Products List',
			},
		],
	},
	{
		id: 5,
		type: 'menu',
		path: '/banner',
		title: 'Banners',
		icon: 'TicketSlash',
		items: [
			{
				id: 3,
				type: 'link',
				path: `${Routes.AddBanner}`,
				title: 'Add Banner',
			},
			{
				id: 4,
				type: 'link',
				path: `${Routes.BannerList}`,
				title: 'Banners List',
			},
		],
	},
];

export async function GET(request: Request) {
	return NextResponse.json({ data });
}
