'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { ImagePlaceholder } from '@devas/ui';
import { Routes } from '../../helpers';

const Subscribe = dynamic(() => import('./components/form'));

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
		<div className="h-screen bg-gray-900 overflow-hidden text-white relative">
			<Link className="flex items-center justify-center absolute z-10 p-16" href="/">
				<ImagePlaceholder
					src="/images/logo.svg"
					containerClasses="w-[120px] h-[54px] lg:w-[160px] lg:h-[62px]"
					imageClasses="rounded-full object-cover animate-fadeIn"
				/>
			</Link>
			<div className="flex flex-col justify-center items-center h-full">
				<div className="z-10">
					<section className="px-16">
						<h2 className="text-[54px] my-24 text-center leading-[54px] lg:text-[70px] font-light animate-fadeIn lg:leading-[92px] text-shadow-1">
							We&apos;re Coming Soon
						</h2>
						<h5 className="text-18 leading-24 text-center font-light lg:text-[23px] lg:leading-[70px] text-shadow-1 animate-fadeIn">
							Subscribe to our mailing list to stay up to date.
						</h5>
						<Subscribe />
					</section>
				</div>
			</div>
			<div className="absolute inset-0 w-full h-screen">
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
			<div className="absolute bottom-12 px-16 right-12">
				<Link href={Routes.Privacy}>
					<span className="text-14 font-semibold">Privacy</span>
				</Link>
			</div>
		</div>
	);
}
