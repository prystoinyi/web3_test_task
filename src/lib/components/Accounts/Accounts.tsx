import type { Account } from '@/app/api/types';

import css from './Accounts.module.css';

interface Props {
	accounts: Account[] | null;
}

export default function Accounts({ accounts }: Props) {
	return (
		<div className={css.accounts}>
			<h1>Test Accounts</h1>

			{accounts?.length ? (
				<table border={1} cellPadding={10}>
					<thead>
						<tr>
							<th>#</th>
							<th>Address</th>
							<th>Balance</th>
						</tr>
					</thead>
					<tbody>
						{accounts.map((account, i) => (
							<tr key={account.id}>
								<td>{i + 1}</td>
								<td>{account.id}</td>
								<td>{account.balance}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				'Loading...'
			)}
		</div>
	);
}
