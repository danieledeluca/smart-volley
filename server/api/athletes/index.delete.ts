import type { DrizzleError } from 'drizzle-orm';

import { deleteAthletes } from '~~/lib/db/queries/athletes';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, MultipleDeleteSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await deleteAthletes(result.data);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
