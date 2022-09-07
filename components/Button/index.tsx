import React, { ButtonHTMLAttributes, ReactHTMLElement } from "react";

const Button: React.FC<
	ButtonHTMLAttributes<HTMLButtonElement> & {
		loading?: boolean;
		variant?: "primary" | "ghost" | "secondary";
		fullWidth?: boolean;
	}
> = ({
	onClick,
	children,
	loading,
	disabled,
	variant = "primary",
	fullWidth,
	...props
}) => {
	return (
		<button
			type="button"
			className={` ${
				fullWidth ? "w-full" : ""
			} outline-none inline-flex items-center px-12 py-3 border-none text-base rounded-2xl shadow-sm text-white bg-primary-blue hover:bg-primary-blue focus:outline-none cursor-pointer justify-center font-medium disabled:bg-gray`}
			onClick={onClick}
			disabled={loading || disabled}
		>
			{children}
		</button>
	);
};

export default Button;
