import type { DrizzleError } from 'drizzle-orm';

import { updateSeason } from '~~/lib/db/queries/seasons';
import { InsertSeason } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const routerParamsResult = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!routerParamsResult.success) {
        return sendZodError(event, routerParamsResult.error);
    }

    const result = await readValidatedBody(event, InsertSeason.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await updateSeason(result.data, routerParamsResult.data.id);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
