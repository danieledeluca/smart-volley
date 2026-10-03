import { deleteAthlete } from '~~/lib/db/queries/athletes';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    const deleted = await deleteAthlete(result.data.id);

    if (!deleted) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.athlete.error'),
        });
    }

    setResponseStatus(event, 204);
});
