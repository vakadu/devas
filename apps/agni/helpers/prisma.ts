import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prismaClient =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: ['query', 'info', 'warn', 'error'], // Optional: Log levels for debugging
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient;
