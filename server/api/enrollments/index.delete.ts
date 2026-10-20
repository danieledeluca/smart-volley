import type { DrizzleError } from 'drizzle-orm';

import { deleteEnrollments } from '~~/lib/db/queries/enrollments';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, MultipleDeleteSchema.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    try {
        await deleteEnrollments(result.data.ids);

        setResponseStatus(event, 204);
    } catch (error) {
        sendDbError(error as DrizzleError);
    }
}, {
    roles: ['admin', 'manager'],
});
