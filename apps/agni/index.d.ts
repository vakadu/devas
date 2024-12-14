import { PrismaClient } from '@prisma/client';

declare module '*.svg' {
	const content: any;
	export const ReactComponent: any;
	export default content;
}
