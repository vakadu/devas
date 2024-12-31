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
