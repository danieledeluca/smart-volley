import { findParent } from '~~/lib/db/queries/parents';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    const parent = await findParent(result.data.id);

    if (!parent) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.parent.error'),
        });
    }

    return parent;
});
