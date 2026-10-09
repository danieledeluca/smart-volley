import type { DrizzleError } from 'drizzle-orm';

import { updateParent } from '~~/lib/db/queries/parents';
import { InsertParent } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const routerParamsResult = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!routerParamsResult.success) {
        return sendZodError(event, routerParamsResult.error);
    }

    const result = await readValidatedBody(event, InsertParent.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        const parent = await updateParent(result.data, routerParamsResult.data.id);

        if (!parent) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: $t('page.parent.error'),
            }));
        }

        return parent;
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
