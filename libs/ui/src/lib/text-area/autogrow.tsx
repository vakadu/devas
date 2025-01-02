//TODO: component is Not working need to check it why

'use client';

import { ChangeEvent, TextareaHTMLAttributes, useRef } from 'react';

import { Label } from '../label';
import { Textarea } from './text-area';

export interface FloatingInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	id: string;
	className?: string;
	isError?: boolean;
}

export function TextareaGrowing({
	label,
	id,
	className = '',
	isError = false,
	...props
}: FloatingInputProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const defaultRows = 1;
	const maxRows = undefined;

	const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
		console.log(e);

		const textarea = e.target;
		textarea.style.height = 'auto';

		const style = window.getComputedStyle(textarea);
		const borderHeight = parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
		const paddingHeight = parseInt(style.paddingTop) + parseInt(style.paddingBottom);

		const lineHeight = parseInt(style.lineHeight);
		const maxHeight = maxRows ? lineHeight * maxRows + borderHeight + paddingHeight : Infinity;

		const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

		textarea.style.height = `${newHeight}px`;
	};

	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<Textarea
				id={id}
				ref={textareaRef}
				onChange={handleInput}
				rows={defaultRows}
				className="min-h-[none] resize-none"
				{...props}
			/>
		</div>
	);
}
