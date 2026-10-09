import type { UserRoleSchema } from '~~/lib/db/schema';
import type { H3Event } from 'h3';

import { auth } from '~~/lib/auth';

export default function defineAuthenticatedEventHandler<T>(
    handler: (event: H3Event) => T,
    options?: { roles?: UserRoleSchema[] },
) {
    return defineEventHandler(async (event) => {
        const session = await auth.api.getSession({
            headers: event.headers,
        });
        const role = session?.user.role;

        if (!role) {
            throw createError({
                statusCode: 401,
                statusMessage: $t('error.forbidden'),
            });
        }

        if (options?.roles && !options.roles.includes(role)) {
            throw createError({
                statusCode: 403,
                statusMessage: $t('error.permission_denied'),
            });
        }

        return handler(event);
    });
}
