import { NextResponse } from 'next/server';
import { Routes } from '../../../core/primitives';

const data: ICommonTypes.INavigationItem[] = [
	{
		id: 8,
		type: 'link',
		path: '/home',
		title: 'Home',
		icon: 'House',
	},
	{
		id: 8,
		type: 'link',
		path: `${Routes.AddStoreProduct}?type=product`,
		title: 'Add Products',
		icon: 'StoreIcon',
	},
];

export async function GET(request: Request) {
	return NextResponse.json({ data });
}
