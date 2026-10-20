import type { DrizzleError } from 'drizzle-orm';

import { updateActivity } from '~~/lib/db/queries/activities';
import { InsertActivity } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const routerParamsResult = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!routerParamsResult.success) {
        return sendZodError(routerParamsResult.error);
    }

    const result = await readValidatedBody(event, InsertActivity.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    try {
        const activity = await updateActivity(routerParamsResult.data.id, result.data);

        if (!activity) {
            throw createError({
                statusCode: 404,
                message: $t('page.activity.error'),
            });
        }

        return activity;
    } catch (error) {
        sendDbError(error as DrizzleError);
    }
}, {
    roles: ['admin', 'manager'],
});
