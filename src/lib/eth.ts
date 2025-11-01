import web3 from './web3';

export async function getAccounts(): Promise<string[]> {
	return await web3.eth.getAccounts();
}

export async function getBalance(address: string): Promise<string> {
	const balanceWei = await web3.eth.getBalance(address);
	const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

	return formatEth(balanceEth);
}

export async function sendTransaction(from: string, to: string, value: string) {
	await web3.eth.sendTransaction({
		from,
		to,
		value: web3.utils.toWei(value.toString(), 'ether'),
	});
}

function formatEth(balance: string): string {
	const [whole, fraction = ''] = balance.split('.');

	return whole + '.' + fraction.padEnd(2, '0').slice(0, 2);
}
