import { findAthlete } from '~~/lib/db/queries/athletes';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    const athlete = await findAthlete(result.data.id);

    if (!athlete) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.athlete.error'),
        });
    }

    return athlete;
});
