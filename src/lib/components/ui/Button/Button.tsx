import css from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
}

export default function Wallet({
	type,
	onClick,
	text,
	className,
}: ButtonProps) {
	const classList = [css.btn, ...(className ? [className] : [])];

	return (
		<button className={classList.join(' ')} type={type} onClick={onClick}>
			{text}
		</button>
	);
}
