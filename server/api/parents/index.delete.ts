import type { DrizzleError } from 'drizzle-orm';

import { deleteParents } from '~~/lib/db/queries/parents';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, MultipleDeleteSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await deleteParents(result.data);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
