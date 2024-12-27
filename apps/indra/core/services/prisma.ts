import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	const globalWithPrisma: any = global;
	if (!globalWithPrisma.prisma) {
		globalWithPrisma.prisma = new PrismaClient();
	}
	prisma = globalWithPrisma.prisma;
}

export { prisma };
