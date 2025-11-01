import type { Data } from './types';

import { NextResponse } from 'next/server';

import { getAccounts, getBalance } from '@/lib/eth';

export async function GET() {
	try {
		const accounts = (await getAccounts()).slice(0, 3);
		const data: Data = [];

		for (const account of accounts) {
			const balance = await getBalance(account);

			data.push({
				id: account,
				balance,
			});
		}

		return NextResponse.json<Data>(data);
	} catch (error) {
		console.error(error);

		return NextResponse.json({ error: 'Oppsss...' }, { status: 500 });
	}
}
