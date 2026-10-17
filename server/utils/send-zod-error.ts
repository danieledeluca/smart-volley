import type { FormError } from '@nuxt/ui';
import type { ZodError } from 'zod';

export default function sendZodError(error: ZodError) {
    const statusMessage = error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ');

    const data = error.issues.map<FormError>((issue) => {
        return {
            name: issue.path.join(''),
            message: issue.message,
        };
    });

    throw createError({
        statusCode: 422,
        statusMessage,
        data,
    });
}
