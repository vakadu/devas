import { X } from 'lucide-react';
import { memo, useCallback } from 'react';

import { Button, Input } from '@devas/ui';

function Header({ value, onChange }: { value: string; onChange: (term: string) => void }) {
	const handleClear = useCallback(() => {
		onChange('');
	}, [onChange]);

	return (
		<div className="flex justify-between py-12">
			<div className="flex-1">
				<div className="max-w-[320px] flex relative">
					<Input
						value={value}
						onChange={(e) => onChange(e.target.value)}
						placeholder="Search for Products..."
						type="search"
						className="pr-[24px]"
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
		</div>
	);
}

export default memo(Header);
