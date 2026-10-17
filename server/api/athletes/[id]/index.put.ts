import type { DrizzleError } from 'drizzle-orm';

import { updateAthlete } from '~~/lib/db/queries/athletes';
import { InsertAthlete } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const routerParamsResult = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!routerParamsResult.success) {
        return sendZodError(routerParamsResult.error);
    }

    const result = await readValidatedBody(event, InsertAthlete.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    try {
        const athlete = await updateAthlete(routerParamsResult.data.id, result.data);

        if (!athlete) {
            throw createError({
                statusCode: 404,
                statusMessage: $t('page.athlete.error'),
            });
        }

        return athlete;
    } catch (error) {
        sendDbError(error as DrizzleError);
    }
}, {
    roles: ['admin', 'manager'],
});
