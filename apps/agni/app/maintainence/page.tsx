import Link from 'next/link';

import { ImagePlaceholder } from '@devas/ui';
import { Routes } from '../../helpers';

export default function Page() {
	return (
		<div className="h-screen overflow-hidden relative">
			<Link className="flex items-center justify-center absolute z-10 p-16" href="/">
				<ImagePlaceholder
					src="/images/logo.svg"
					containerClasses="w-[120px] h-[54px] lg:w-[160px] lg:h-[62px]"
					imageClasses="rounded-full object-cover animate-fadeIn"
				/>
			</Link>
			<div className="flex flex-col justify-center items-center h-full">
				<div className="z-10">
					<section className="px-16 flex flex-col justify-center items-center">
						<ImagePlaceholder
							src="/images/maintainence.svg"
							containerClasses="w-[400px] h-[400px]"
							imageClasses="object-cover"
						/>
						<h2 className="text-[32px] text-center leading-[32px] lg:text-[54px] lg:leading-[54px] mb-24">
							We are under maintenance.
						</h2>
						<h5 className="text-16 leading-22 text-center lg:text-[18px] lg:leading-[24px]">
							We’re making the system more awesome.
						</h5>
						<h5 className="text-16 leading-22 text-center lg:text-[18px] lg:leading-[24px]">
							We’ll be back shortly.
						</h5>
					</section>
				</div>
			</div>
			<div className="absolute bottom-12 px-16 right-12">
				<Link href={Routes.Privacy}>
					<span className="text-14 font-semibold">Privacy</span>
				</Link>
			</div>
		</div>
	);
}
