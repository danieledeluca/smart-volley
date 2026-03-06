import type { ZodError } from 'zod';

import { z } from 'zod';

export default function sendZodError(error: ZodError) {
    throw createError({
        statusCode: 422,
        statusMessage: 'Unprocessable Content',
        message: z.prettifyError(error),
    });
}
