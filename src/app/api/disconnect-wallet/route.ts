import { NextResponse } from 'next/server';

export async function POST() {
	try {
		const response = NextResponse.json({ message: 'Wallet disconnected' });

		response.cookies.delete({
			name: 'wallet_address',
			path: '/',
		});

		return response;
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{ error: 'Failed to disconnect wallet' },
			{ status: 500 },
		);
	}
}
