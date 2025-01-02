import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-48 w-full rounded-12 border border-grey-light bg-white px-14 py-12 text-16 text-black-2 shadow-1 shadow-black-1 ring-offset-background transition-shadow focus-visible:border-[2px] focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					type === 'search' &&
						'[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none',
					type === 'file' &&
						'p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);

export default Input;
