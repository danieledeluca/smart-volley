import type { DrizzleError } from 'drizzle-orm';

import { updateUserRole } from '~~/lib/db/queries/auth';
import { UpdateUserRoleSchema } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const routerParamsResult = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!routerParamsResult.success) {
        return sendZodError(event, routerParamsResult.error);
    }

    const user = await getUser(event);

    if (routerParamsResult.data.id === Number(user.id)) {
        throw createError({
            statusCode: 400,
            statusMessage: $t('page.user.error.not_able'),
        });
    }

    const result = await readValidatedBody(event, UpdateUserRoleSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        const updated = await updateUserRole(routerParamsResult.data.id, result.data.role);

        if (!updated) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: $t('page.user.error.not_found'),
            }));
        }

        setResponseStatus(event, 204);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
}, {
    roles: ['admin'],
});
