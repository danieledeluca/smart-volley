import type { DrizzleError } from 'drizzle-orm';

import { updateParent } from '~~/lib/db/queries/parents';
import { InsertParent } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const routerParamsResult = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!routerParamsResult.success) {
        return sendZodError(routerParamsResult.error);
    }

    const result = await readValidatedBody(event, InsertParent.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    try {
        const parent = await updateParent(routerParamsResult.data.id, result.data);

        if (!parent) {
            throw createError({
                statusCode: 404,
                message: $t('page.parent.error'),
            });
        }

        return parent;
    } catch (error) {
        sendDbError(error as DrizzleError);
    }
}, {
    roles: ['admin', 'manager'],
});
