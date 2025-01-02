import { InputHTMLAttributes } from 'react';
import Input from './input';
import { Label } from '../label';

export interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
	className?: string;
	isError?: boolean;
}

// 'use client';

// import * as React from 'react';

// import { cn } from '../../utils';

// const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
// 	({ className, ...props }, ref) => (
// 		<label
// 			ref={ref}
// 			className={cn(
// 				'text-sm font-medium leading-4 text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
// 				className
// 			)}
// 			{...props}
// 		/>
// 	)
// );
// Label.displayName = 'Label';

// export { Label };

export const FloatingInput = ({
	type,
	label,
	id,
	className = '',
	isError = false,
	...props
}: FloatingInputProps) => {
	return (
		<div className="group relative lg:text-16 text-14">
			<label
				htmlFor={id}
				className={`origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-12 text-16 text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-12 group-focus-within:font-medium group-focus-within:text-primary has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground ${
					isError && '!text-destructive'
				}`}
			>
				<span className="inline-flex bg-background px-6">{label}</span>
			</label>
			<Input
				id={id}
				type={type}
				className={`${
					isError &&
					'border-destructive/80 text-destructive focus-visible:border-destructive'
				} ${className}`}
				placeholder=""
				{...props}
			/>
		</div>
	);
};

export default FloatingInput;
