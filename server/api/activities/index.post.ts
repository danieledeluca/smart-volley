import type { DrizzleError } from 'drizzle-orm';

import { insertActivity } from '~~/lib/db/queries/activities';
import { InsertActivity } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, InsertActivity.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await insertActivity(result.data);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
