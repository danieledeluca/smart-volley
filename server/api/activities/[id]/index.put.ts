import type { DrizzleError } from 'drizzle-orm';

import { updateActivity } from '~~/lib/db/queries/activities';
import { InsertActivity } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const result = await readValidatedBody(event, InsertActivity.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await updateActivity(result.data, id);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
