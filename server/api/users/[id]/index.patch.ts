import type { DrizzleError } from 'drizzle-orm';

import { updateUserRole } from '~~/lib/db/queries/auth';

export default defineAuthenticatedEventHandler(async (event) => {
    const routerParamsResult = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!routerParamsResult.success) {
        return sendZodError(routerParamsResult.error);
    }

    const currentUser = await getUser(event);

    if (routerParamsResult.data.id === Number(currentUser.id)) {
        throw createError({
            statusCode: 400,
            message: $t('page.user.error.not_able'),
        });
    }

    const result = await readValidatedBody(event, UpdateUserRoleSchema.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    try {
        const user = await updateUserRole(routerParamsResult.data.id, result.data.role);

        if (!user) {
            throw createError({
                statusCode: 404,
                message: $t('page.user.error.not_found'),
            });
        }

        return user;
    } catch (error) {
        sendDbError(error as DrizzleError);
    }
}, {
    roles: ['admin'],
});
