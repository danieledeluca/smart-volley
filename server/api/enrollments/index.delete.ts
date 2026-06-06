import type { DrizzleError } from 'drizzle-orm';

import { deleteEnrollments } from '~~/lib/db/queries/enrollments';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, MultipleDeleteSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await deleteEnrollments(result.data);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
