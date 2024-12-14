import { PrismaClient } from '@prisma/client';

declare module '*.svg' {
	const content: any;
	export const ReactComponent: any;
	export default content;
}

declare global {
	// Extend the NodeJS.Global interface to include `prisma`
	namespace NodeJS {
		interface Global {
			prisma: PrismaClient | undefined;
		}
	}
}
