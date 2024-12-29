import { ChevronDown } from 'lucide-react';

import { DropdownMenu, DropdownMenuTrigger, ImagePlaceholder } from '@devas/ui';
import { useAppSelector } from '../store';

export const Header = () => {
	const { name, mobile } = useAppSelector((state) => state.auth);

	return (
		<header className="flex h-[72px] justify-between shrink-0 items-center gap-12 border-b px-16">
			<div className="flex items-center">
				{/* <SidebarTrigger /> */}
				<ImagePlaceholder
					src="/images/logo.svg"
					containerClasses="w-[110px] h-[38px]"
					imageClasses="object-cover"
				/>
			</div>
			{/* <div>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<div className="flex items-center gap-6">
							<span className="text-14 font-light">{name ? name : mobile}</span>
							<ChevronDown className="size-16" />
						</div>
					</DropdownMenuTrigger>
				</DropdownMenu>
			</div> */}
		</header>
	);
};
