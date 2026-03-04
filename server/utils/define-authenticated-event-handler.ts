import type { H3Event } from 'h3';

import { serverSupabaseUser } from '#supabase/server';

export default function defineAuthenticatedEventHandler<T>(
    handler: (event: H3Event) => T,
) {
    return defineEventHandler(async (event) => {
        const user = await serverSupabaseUser(event);

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized',
            });
        }

        return handler(event);
    });
}
