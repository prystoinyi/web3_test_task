import { Data as Wallet } from '@/app/api/get-wallet/types';

export async function connectWallet(address: string): Promise<void> {
	const res = await fetch('/api/connect-wallet', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ address }),
	});

	if (!res.ok) throw new Error('Failed connection');
}

export async function disconnectWallet(): Promise<void> {
	const res = await fetch('/api/disconnect-wallet', {
		method: 'POST',
	});

	if (!res.ok) throw new Error('Failed disconnection');
}

export async function getWallet(): Promise<Wallet> {
	const res = await fetch('/api/get-wallet');

	if (!res.ok) throw new Error('Failed to fetch wallet');

	return res.json();
}

export async function sendETH(amount: number, recipient: string) {
	const res = await fetch('/api/send-eth', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ amount, recipient }),
	});

	if (!res.ok) throw new Error('Failed to send ETH');
}
