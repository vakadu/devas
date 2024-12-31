import { NextResponse } from 'next/server';

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
				path: '/catalouge/add-product',
				title: 'Add Product',
			},
		],
	},
];

export async function GET(request: Request) {
	return NextResponse.json({ data });
}
