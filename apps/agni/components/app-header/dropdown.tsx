import { ChevronDown, LogOutIcon } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@devas/ui';

const AuthDropdown = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="flex items-center justify-center gap-6">
					<span className="text-14 font-medium">My Account</span>
					<ChevronDown width={20} height={20} />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<div className="cursor-pointer flex gap-6 items-center">
						<LogOutIcon width={16} height={16} />
						<span>Logout</span>
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AuthDropdown;
