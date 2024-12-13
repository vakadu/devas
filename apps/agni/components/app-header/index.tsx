import dynamic from 'next/dynamic';

import { ImagePlaceholder } from '@devas/ui';
import Link from 'next/link';

const HeaderRight = dynamic(() => import('./header-right'), {
	loading: () => <span>Loading...</span>,
});

export function Header() {
	return (
		<header className="shadow-base fixed z-50 w-full h-[80px] top-0 left-0 right-0 bottom-0 bg-white">
			<div className="max-w-[1200px] min-w-[1200px] mx-auto h-[80px]">
				<div className="flex justify-between items-center h-full">
					<Link href="/">
						<ImagePlaceholder
							src="/images/logo.svg"
							containerClasses="w-[120px] h-[80px]"
							imageClasses="rounded-full object-contain"
						/>
					</Link>
					<HeaderRight />
				</div>
			</div>
		</header>
	);
}

export default Header;
