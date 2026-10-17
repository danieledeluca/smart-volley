import type { DrizzleError } from 'drizzle-orm';

import { insertAthlete } from '~~/lib/db/queries/athletes';
import { InsertAthlete } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, InsertAthlete.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    try {
        return await insertAthlete(result.data);
    } catch (error) {
        sendDbError(error as DrizzleError);
    }
}, {
    roles: ['admin', 'manager'],
});
