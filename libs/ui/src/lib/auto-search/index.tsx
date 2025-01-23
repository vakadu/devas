'use client';

import { ReactNode } from 'react';

import { Command, CommandInput } from '../command';
import { Popover, PopoverAnchor, PopoverContent } from '../popover';
import { cn } from '@devas/utils';

interface IAutoSearchProps {
	searchValue: string;
	onSearchValueChange: (s: string) => void;
	children: ReactNode;
	placeholder: string;
	className?: string;
	open: boolean;
	setOpen: (o: boolean) => void;
}

export function AutoSearch({
	searchValue,
	onSearchValueChange,
	children,
	placeholder,
	className,
	open,
	setOpen,
}: IAutoSearchProps) {
	const reset = () => {
		onSearchValueChange('');
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<Command className={cn('max-w-[320px]', className)}>
				<PopoverAnchor asChild>
					<CommandInput
						value={searchValue}
						onValueChange={onSearchValueChange}
						onFocus={() => setOpen(true)}
						placeholder={placeholder}
					/>
				</PopoverAnchor>
				<PopoverContent className="w-[--radix-popover-trigger-width] p-0">
					{children}
				</PopoverContent>
			</Command>
		</Popover>
	);
}
