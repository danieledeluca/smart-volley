import type { DriverAdapterError } from '@prisma/driver-adapter-utils';

import { Prisma } from '~~/prisma/generated/prisma/client';

export default function sendPrismaError(error: Error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const cause = (error.meta?.driverAdapterError as DriverAdapterError | undefined)?.cause;

        if (cause?.kind === 'UniqueConstraintViolation') {
            const fields = cause.constraint && 'fields' in cause.constraint
                ? cause.constraint.fields.join(', ')
                : cause.originalMessage ?? 'unknown field';

            throw createError({
                statusCode: 409,
                statusMessage: `Already exists: ${fields}`,
            });
        }

        if (cause?.kind === 'ForeignKeyConstraintViolation') {
            throw createError({
                statusCode: 409,
                statusMessage: 'Related record not found',
            });
        }
    }

    throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error',
    });
}
