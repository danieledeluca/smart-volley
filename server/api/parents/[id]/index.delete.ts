import { deleteParent } from '~~/lib/db/queries/parents';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const deleted = await deleteParent(id);

    if (!deleted) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.parent.error'),
        });
    }

    setResponseStatus(event, 204);
});
