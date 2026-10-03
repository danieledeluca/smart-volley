import { findSeason } from '~~/lib/db/queries/seasons';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    const season = await findSeason(result.data.id);

    if (!season) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.season.error'),
        });
    }

    return season;
});
