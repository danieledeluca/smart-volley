import type { FormError } from '@nuxt/ui';
import type { H3Event } from 'h3';
import type { ZodError } from 'zod';

export default function sendZodError(event: H3Event, error: ZodError) {
    const statusMessage = error.issues.map((issue) => `${issue.path.join('')}: ${issue.message}`).join('; ');

    const data = error.issues.map<FormError>((issue) => {
        return {
            name: issue.path.join(''),
            message: issue.message,
        };
    });

    return sendError(event, createError({
        statusCode: 422,
        statusMessage,
        data,
    }));
}
