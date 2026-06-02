import { findParent } from '~~/lib/db/queries/parents';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const parent = await findParent(id);

    if (!parent) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.parent.error'),
        });
    }

    return parent;
});
