'use client';

import type { Account } from './api/types';

import { useEffect, useState } from 'react';

import Accounts from '@/lib/components/Accounts';
import Wallet from '@/lib/components/Wallet';

import { getTestAccounts } from '@/lib/api/test-accounts';

export default function Home() {
	const [accounts, setAccounts] = useState<Account[] | null>(null);

	const loadAccounts = async () => setAccounts(await getTestAccounts());

	useEffect(() => {
		loadAccounts();
	}, []);

	return (
		<div className="flex min-h-screen items-center justify-center">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 md:border-x border-gray-400 overflow-hidden">
				<Accounts accounts={accounts} />
				<Wallet updateAccounts={loadAccounts} />
			</main>
		</div>
	);
}
