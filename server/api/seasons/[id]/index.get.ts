import { findSeason } from '~~/lib/db/queries/seasons';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const season = await findSeason(id);

    if (!season) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.season.error'),
        });
    }

    return season;
});
