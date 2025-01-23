import { NextResponse } from 'next/server';

const data: ICommonTypes.INavigationItem[] = [
	{
		id: 8,
		type: 'link',
		path: '/home',
		title: 'Home',
		icon: 'House',
	},
];

export async function GET(request: Request) {
	return NextResponse.json({ data });
}
