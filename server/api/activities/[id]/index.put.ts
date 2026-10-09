import type { DrizzleError } from 'drizzle-orm';

import { updateActivity } from '~~/lib/db/queries/activities';
import { InsertActivity } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const routerParamsResult = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!routerParamsResult.success) {
        return sendZodError(event, routerParamsResult.error);
    }

    const result = await readValidatedBody(event, InsertActivity.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        const activity = await updateActivity(result.data, routerParamsResult.data.id);

        if (!activity) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: $t('page.activity.error'),
            }));
        }

        return activity;
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
