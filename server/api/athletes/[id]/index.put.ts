import type { DrizzleError } from 'drizzle-orm';

import { updateAthlete } from '~~/lib/db/queries/athletes';
import { InsertAthlete } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const result = await readValidatedBody(event, InsertAthlete.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await updateAthlete(result.data, id);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
