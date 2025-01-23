import { Search, X } from 'lucide-react';
import { memo, useCallback } from 'react';

import { Button, Input } from '@devas/ui';
import { cn } from '@devas/utils';

function Header({ value, onChange }: { value: string; onChange: (term: string) => void }) {
	const handleClear = useCallback(() => {
		onChange('');
	}, [onChange]);

	return (
		<div className="flex justify-between py-12 px-12 border-b">
			<div className="flex items-center border-b px-12 w-[520px] relative">
				<Search className="mr-12 h-16 w-16 shrink-0 opacity-50" />
				<Input
					className={cn(
						'flex h-32 w-full rounded-md bg-transparent py-12 text-14 font-medium outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none pl-0'
					)}
					type="search"
					placeholder="Search for banners..."
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				{value.length > 0 && (
					<Button
						size="icon"
						variant="ghost"
						className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
						onClick={handleClear}
					>
						<X className="!size-16 text-red-1" />
					</Button>
				)}
			</div>
		</div>
	);
}

export default memo(Header);
