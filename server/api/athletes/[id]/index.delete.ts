import { deleteAthlete } from '~~/lib/db/queries/athletes';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const deleted = await deleteAthlete(id);

    if (!deleted) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.athlete.error'),
        });
    }

    setResponseStatus(event, 204);
});
