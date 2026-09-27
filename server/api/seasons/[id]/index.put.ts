import type { DrizzleError } from 'drizzle-orm';

import { updateSeason } from '~~/lib/db/queries/seasons';
import { InsertSeason } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const result = await readValidatedBody(event, InsertSeason.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await updateSeason(result.data, id);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
