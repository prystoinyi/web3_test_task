import { getAccounts } from './eth';

export async function ensureAddress(
	address: string | undefined,
): Promise<string> {
	if (!address) {
		throw new Error('Address unknown');
	}

	const accounts = await getAccounts();

	if (!accounts.includes(address)) {
		throw new Error('Address not exist');
	}

	return address;
}
