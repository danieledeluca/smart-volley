import { deleteParent } from '~~/lib/db/queries/parents';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    const deleted = await deleteParent(result.data.id);

    if (!deleted) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.parent.error'),
        });
    }

    setResponseStatus(event, 204);
}, {
    roles: ['admin', 'manager'],
});
