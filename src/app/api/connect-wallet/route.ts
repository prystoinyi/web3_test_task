import { NextRequest, NextResponse } from 'next/server';

import { ensureAddress } from '@/lib/api';

export async function POST(req: NextRequest) {
	try {
		const address = await ensureAddress((await req.json()).address);

		const response = NextResponse.json({
			message: 'Wallet connected',
		});

		response.cookies.set('wallet_address', address, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24,
		});

		return response;
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{ error: 'Failed to connect wallet' },
			{ status: 500 },
		);
	}
}
