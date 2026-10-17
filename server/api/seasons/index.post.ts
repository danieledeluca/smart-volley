import type { DrizzleError } from 'drizzle-orm';

import { insertSeason } from '~~/lib/db/queries/seasons';
import { InsertSeason } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, InsertSeason.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    try {
        return await insertSeason(result.data);
    } catch (error) {
        sendDbError(error as DrizzleError);
    }
}, {
    roles: ['admin', 'manager'],
});
