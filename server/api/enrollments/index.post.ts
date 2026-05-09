import type { DrizzleError } from 'drizzle-orm';

import { insertEnrollment } from '~~/lib/db/queries/enrollments';
import { InsertEnrollment } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, InsertEnrollment.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await insertEnrollment(result.data);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
