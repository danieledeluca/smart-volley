import type { DrizzleError } from 'drizzle-orm';

import { deleteEnrollments } from '~~/lib/db/queries/enrollments';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, MultipleDeleteSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        await deleteEnrollments(result.data);

        setResponseStatus(event, 204);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
