import type { DrizzleError } from 'drizzle-orm';

import { deleteParents } from '~~/lib/db/queries/parents';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, MultipleDeleteSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        await deleteParents(result.data);

        setResponseStatus(event, 204);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
}, {
    roles: ['admin', 'manager'],
});
