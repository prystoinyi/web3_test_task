import type { Account } from '@/app/api/types';

import { useEffect, useState } from 'react';

import {
	connectWallet,
	disconnectWallet,
	getWallet,
	sendETH,
} from '@/lib/api/wallet';

import Button from '@/lib/components/ui/Button';

import css from './Wallet.module.css';

interface Props {
	updateAccounts: () => Promise<void>;
}

export default function Wallet({ updateAccounts }: Props) {
	const [wallet, setWallet] = useState<Account | null>(null);
	const [showAddres, setShowAddres] = useState(false);

	const loadWallet = async () => setWallet(await getWallet());

	useEffect(() => {
		loadWallet();
	}, []);

	const handleConnectWallet = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const address = formData.get('address');

		if (typeof address === 'string') {
			await connectWallet(address);
			await loadWallet();
		}
	};

	const handleDisconnecttWallet = async (
		event: React.FormEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();

		await disconnectWallet();
		await loadWallet();
	};

	const handleShowAddress = async () => {
		setShowAddres(true);
	};

	const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const amount = formData.get('amount');
		const recipient =
			formData.get('recipient') || '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

		if (typeof amount === 'string' && typeof recipient === 'string') {
			await sendETH(Number(amount), recipient);
			await loadWallet();
			await updateAccounts();
		}
	};

	return (
		<div className={css.wallet}>
			<h1>
				Wallet{' '}
				{wallet && <Button text="Exit" onClick={handleDisconnecttWallet} />}
			</h1>

			{!wallet ? (
				<div className={css.container}>
					<form className={css.connect} onSubmit={handleConnectWallet}>
						<input type="text" name="address" required />
						<Button type="submit" text="Connect" />
					</form>
				</div>
			) : (
				<div className={css.container}>
					<div className={css.balance}>Balance: {wallet.balance}</div>

					<div className={css.address}>
						{showAddres ? (
							<span>Address: {wallet.id}</span>
						) : (
							<Button text="Show Address" onClick={handleShowAddress} />
						)}
					</div>

					<form className={css.transaction} onSubmit={handleSend}>
						<h2>Send ETH</h2>
						<div>
							<input
								type="text"
								name="recipient"
								required
								placeholder="Recipient"
							/>
							<input
								type="number"
								name="amount"
								min={0}
								required
								placeholder="Amount"
							/>
						</div>

						<Button type="submit" text="Send" className={css.btn} />
					</form>
				</div>
			)}
		</div>
	);
}
