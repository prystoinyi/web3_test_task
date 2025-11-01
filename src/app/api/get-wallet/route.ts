import type { Data } from './types';

import { NextRequest, NextResponse } from 'next/server';

import { getAccounts, getBalance } from '@/lib/eth';

export async function GET(req: NextRequest) {
	try {
		const address = req.cookies.get('wallet_address')?.value;

		if (!address) {
			return NextResponse.json(null);
		}

		const accounts = await getAccounts();

		if (!accounts.includes(address)) {
			return NextResponse.json(null);
		}

		const balance = await getBalance(address);

		return NextResponse.json<Data>({
			id: address,
			balance,
		});
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{ error: 'Failed to fetch wallet' },
			{ status: 500 },
		);
	}
}
