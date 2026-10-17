import type { DrizzleError } from 'drizzle-orm';

import { updateSeason } from '~~/lib/db/queries/seasons';
import { InsertSeason } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const routerParamsResult = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!routerParamsResult.success) {
        return sendZodError(routerParamsResult.error);
    }

    const result = await readValidatedBody(event, InsertSeason.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    try {
        const season = await updateSeason(routerParamsResult.data.id, result.data);

        if (!season) {
            throw createError({
                statusCode: 404,
                statusMessage: $t('page.season.error'),
            });
        }

        return season;
    } catch (error) {
        sendDbError(error as DrizzleError);
    }
}, {
    roles: ['admin', 'manager'],
});
