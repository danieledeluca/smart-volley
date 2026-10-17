import { deleteParent } from '~~/lib/db/queries/parents';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    const parent = await deleteParent(result.data.id);

    if (!parent) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.parent.error'),
        });
    }

    setResponseStatus(event, 204);
}, {
    roles: ['admin', 'manager'],
});
