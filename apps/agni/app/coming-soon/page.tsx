'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ImagePlaceholder } from '@devas/ui';
import Subscribe from './components/form';

export default function Page() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slides = ['landscape.jpg', 'sunrise.jpg', 'forest.jpg'];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 7000);

		return () => clearInterval(interval);
	}, [slides.length]);

	return (
		<div className="h-screen bg-gray-900 text-white">
			<div className="flex flex-col justify-center items-center h-full">
				<div className="z-10">
					<section className="px-4">
						<div>
							<div>
								<Link className="flex items-center justify-center" href="/">
									<ImagePlaceholder
										src="/images/logo.svg"
										containerClasses="w-[240px] h-[80px]"
										imageClasses="rounded-full object-contain"
									/>
								</Link>
								<h2 className="text-[70px] font-light anim-go-right animate-goRight leading-[120px] text-shadow-1">
									We&apos;re Coming Soon In
								</h2>
								<h5 className="mt-4 font-light text-[23px] leading-[70px] text-shadow-1">
									Subscribe to our mailing list or follow us on social media to
									stay up to date.
								</h5>
								<Subscribe />
							</div>
						</div>
					</section>
				</div>
			</div>
			<div className="absolute inset-0">
				{slides.map((image, index) => (
					<ImagePlaceholder
						key={index}
						src={`/images/${image}`}
						alt={`Slide ${index}`}
						className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
							currentSlide === index ? 'opacity-100' : 'opacity-0'
						}`}
						priority={true}
					/>
				))}
			</div>
		</div>
	);
}
