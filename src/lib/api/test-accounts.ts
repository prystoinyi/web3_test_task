import type { Data as Accounts } from '@/app/api/get-test-accounts/types';

export async function getTestAccounts(): Promise<Accounts> {
	const res = await fetch('/api/get-test-accounts');

	if (!res.ok) throw new Error('Failed to fetch accounts');

	return res.json();
}
