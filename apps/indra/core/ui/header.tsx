import { Separator } from '@devas/ui';

export const Header = () => {
	return (
		<header className="flex h-54 shrink-0 items-center gap-2 border-b">
			<div className="flex items-center gap-12 px-16">
				{/* <SidebarTrigger /> */}
				<Separator orientation="vertical" className="mr-2 h-4" />
			</div>
		</header>
	);
};
