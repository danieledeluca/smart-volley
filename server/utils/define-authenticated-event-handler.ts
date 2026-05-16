import type { H3Event } from 'h3';

import { auth } from '~~/lib/auth';

export default function defineAuthenticatedEventHandler<T>(handler: (event: H3Event) => T) {
    return defineEventHandler(async (event) => {
        const session = await auth.api.getSession({
            headers: event.headers,
        });

        if (!session?.user.role) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized',
            });
        }

        return handler(event);
    });
}
