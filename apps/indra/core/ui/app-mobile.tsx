'use client';

import { ImagePlaceholder } from '@devas/ui';

export const AppMobile = () => {
	return (
		<div className="min-h-screen flex flex-col justify-center bg-white items-center text-center py-20 space-y-16">
			<ImagePlaceholder
				containerClasses="w-[400px] h-[400px]"
				src="/images/maintainence.svg"
			/>
			<div className="max-w-[546px] mx-auto w-full">
				<p className="text-24 font-semibold mb-12">
					🚫 This platform is only accessible on desktop devices. Please switch to a
					desktop for the best experience.
				</p>
			</div>
		</div>
	);
};
