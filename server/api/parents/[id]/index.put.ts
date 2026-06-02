import type { DrizzleError } from 'drizzle-orm';

import { updateParent } from '~~/lib/db/queries/parents';
import { InsertParent } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const result = await readValidatedBody(event, InsertParent.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await updateParent(result.data, id);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
