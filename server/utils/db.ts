import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '~~/prisma/generated/prisma/client';

function prismaClientSingleton() {
    const pool = new PrismaPg({ connectionString: env.DATABASE_URL! });
    return new PrismaClient({ adapter: pool });
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
