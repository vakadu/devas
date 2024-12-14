import React from 'react';
import Link from 'next/link';

import { Button, ImagePlaceholder } from '@devas/ui';

const PageNotFound = () => {
	return (
		<div className="min-h-screen flex flex-col justify-center bg-white items-center text-center py-20 space-y-16">
			<ImagePlaceholder containerClasses="w-[400px] h-[400px]" src="/images/404.svg" />
			<div className="max-w-[546px] mx-auto w-full">
				<h4 className="text-32 font-semibold mb-12">Page not found</h4>
				<p className="mb-10">
					The page you are looking for might have been removed had its name changed or is
					temporarily unavailable.
				</p>
			</div>
			<Link href="/">
				<Button>Go to homepage</Button>
			</Link>
		</div>
	);
};

export default PageNotFound;
