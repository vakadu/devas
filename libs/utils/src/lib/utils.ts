import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const capitalize = (value: string) => {
	return value
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const slideDown = {
	initial: { y: -50, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	exit: { y: -50, opacity: 0 },
	transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 },
};
