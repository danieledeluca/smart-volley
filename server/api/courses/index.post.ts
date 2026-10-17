import type { DrizzleError } from 'drizzle-orm';

import { insertCourse } from '~~/lib/db/queries/courses';
import { InsertCourse } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, InsertCourse.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    try {
        return await insertCourse(result.data);
    } catch (error) {
        sendDbError(error as DrizzleError);
    }
}, {
    roles: ['admin', 'manager'],
});
