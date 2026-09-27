import { findActivity } from '~~/lib/db/queries/activities';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const activity = await findActivity(id);

    if (!activity) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.activity.error'),
        });
    }

    return activity;
});
