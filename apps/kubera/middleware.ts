import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { Routes } from './core/primitives/routes';

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname === '/') {
		return NextResponse.redirect(new URL(Routes.Home, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/'],
};
