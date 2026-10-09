import type { DrizzleError } from 'drizzle-orm';

import { updateAthlete } from '~~/lib/db/queries/athletes';
import { InsertAthlete } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const routerParamsResult = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!routerParamsResult.success) {
        return sendZodError(event, routerParamsResult.error);
    }

    const result = await readValidatedBody(event, InsertAthlete.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        const athlete = await updateAthlete(result.data, routerParamsResult.data.id);

        if (!athlete) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: $t('page.athlete.error'),
            }));
        }

        return athlete;
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
}, {
    roles: ['admin', 'manager'],
});
