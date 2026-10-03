import { findActivity } from '~~/lib/db/queries/activities';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    const activity = await findActivity(result.data.id);

    if (!activity) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.activity.error'),
        });
    }

    return activity;
});
