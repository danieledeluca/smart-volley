import { findAthlete } from '~~/lib/db/queries/athletes';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id') as string);

    const athlete = await findAthlete(id);

    if (!athlete) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.athlete.error'),
        });
    }

    return athlete;
});
