'use client';

import { ChevronDownIcon, X } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '../../utils';
import { SearchSelectContext, useSearchSelectTrigger } from './context';
import { Button } from '../button';

interface ISearchSelectInputProps {
	value: string;
	onChange: (e: string) => void;
}

export const SearchSelectList = ({ children, ...props }: { children: ReactNode }) => {
	const [show, setShow] = useState(false);
	const value = {
		show,
		setShow,
	};
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setShow(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, []);

	return (
		<SearchSelectContext.Provider value={value}>
			<div ref={ref} className="relative">
				{children}
			</div>
		</SearchSelectContext.Provider>
	);
};

export const SearchSelectTrigger = ({ children, ...props }: { children: ReactNode }) => {
	const { setShow, show } = useSearchSelectTrigger();

	return (
		<div
			className={cn(
				'flex h-[48px] w-full items-center justify-between whitespace-nowrap rounded-8 border border-grey-light bg-transparent px-12 py-6 placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:border-2 disabled:cursor-not-allowed disabled:opacity-50 mt-6 cursor-pointer'
			)}
			onClick={() => setShow(!show)}
			{...props}
		>
			{children}
			<ChevronDownIcon className="!size-16 opacity-50" />
		</div>
	);
};

export const SearchSelectLabel = ({ children, ...props }: { children: ReactNode }) => {
	return (
		<span className="text-12 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
			{children}
		</span>
	);
};

export const SearchSelectContent = ({ children, ...props }: { children: ReactNode }) => {
	const { show } = useSearchSelectTrigger();

	if (show) {
		return (
			<div
				className="absolute z-[100] bg-white border border-grey-light shadow-md rounded-md w-full max-h-[280px] overflow-y-scroll"
				{...props}
			>
				{children}
			</div>
		);
	}
	return null;
};

export const SearchSelectInput = ({ value, onChange }: ISearchSelectInputProps) => {
	return (
		<div className="relative">
			<input
				type="search"
				className="w-full border-b rounded-8 h-42 py-8 focus:outline-none pl-12 pr-32 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
				placeholder="Search for Products..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{value.length > 0 && (
				<Button
					className="absolute right-8 top-1/2 -translate-y-1/2"
					variant="ghost"
					size="icon"
					onClick={() => onChange('')}
				>
					<X className="!size-16 text-red-1" />
				</Button>
			)}
		</div>
	);
};

export const SearchSelectOption = ({
	children,
	className,
	...props
}: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			type="button"
			className={cn(
				'relative flex w-full select-none items-center py-8 px-16 text-14 outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer border-b border-grey-divider',
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};
