import { TextareaHTMLAttributes } from 'react';

import { Textarea } from './text-area';
import { Label } from '../label';

export interface FloatingInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	id: string;
	className?: string;
	isError?: boolean;
}

export function FloatingTextArea({
	label,
	id,
	className = '',
	isError = false,
	...props
}: FloatingInputProps) {
	return (
		<div className="group relative">
			<label
				htmlFor={id}
				className={`origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-12 text-16 text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-12 group-focus-within:font-medium group-focus-within:text-primary has-[+textarea:not(:placeholder-shown)]:pointer-events-none has-[+textarea:not(:placeholder-shown)]:top-0 has-[+textarea:not(:placeholder-shown)]:cursor-default has-[+textarea:not(:placeholder-shown)]:text-xs has-[+textarea:not(:placeholder-shown)]:font-medium has-[+textarea:not(:placeholder-shown)]:text-foreground ${
					isError && '!text-destructive'
				}`}
			>
				<span className="inline-flex bg-background px-6">{label}</span>
			</label>
			<Textarea
				className={`${
					isError &&
					'border-destructive/80 text-destructive focus-visible:border-destructive'
				} ${className}`}
				placeholder=""
				{...props}
			/>
		</div>
	);
}
