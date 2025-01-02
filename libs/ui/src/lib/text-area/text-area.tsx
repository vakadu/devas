import { forwardRef, TextareaHTMLAttributes } from 'react';

import { cn } from '../../utils';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					'flex min-h-[80px] w-full rounded-12 border border-grey-light bg-white px-14 py-12 text-16 text-black-2 shadow-1 shadow-black-1 ring-offset-background transition-shadow focus-visible:border-[2px] focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
