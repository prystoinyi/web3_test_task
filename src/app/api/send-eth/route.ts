import { NextResponse, NextRequest } from 'next/server';

import { ensureAddress } from '@/lib/api';
import { sendTransaction } from '@/lib/eth';

export async function POST(req: NextRequest) {
	try {
		const address = await ensureAddress(
			req.cookies.get('wallet_address')?.value,
		);

		const { amount, recipient } = await req.json();

		if (!amount || !recipient) {
			return NextResponse.json(
				{ error: 'Amount and recipient are required' },
				{ status: 400 },
			);
		}

		if (address === recipient) {
			return NextResponse.json(
				{ error: 'Invalid address recipient' },
				{ status: 400 },
			);
		}

		await sendTransaction(address, recipient, amount);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(error);

		return NextResponse.json({ error: 'Failed to send ETH' }, { status: 500 });
	}
}
