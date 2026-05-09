import type { DrizzleError } from 'drizzle-orm';

import { insertParent } from '~~/lib/db/queries/parents';
import { InsertParent } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, InsertParent.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await insertParent(result.data);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
