import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../core/services';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const { userId, role, mobile, eventName, eventType, source = 'web', metadata = {} } = body;

		if (!userId || !eventName) {
			return NextResponse.json(
				{ error: 'userId and eventName are required fields.' },
				{ status: 400 }
			);
		}
		await prisma.dashboard_analytics.create({
			data: {
				userId,
				role,
				mobile,
				eventName,
				eventType: eventType || '',
				source,
				metadata: metadata as any,
			},
		});

		return NextResponse.json({ message: 'Event tracked successfully' }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ error: error?.message || 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
