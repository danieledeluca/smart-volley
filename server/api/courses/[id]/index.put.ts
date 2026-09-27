import type { DrizzleError } from 'drizzle-orm';

import { updateCourse } from '~~/lib/db/queries/courses';
import { InsertCourse } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const result = await readValidatedBody(event, InsertCourse.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await updateCourse(result.data, id);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
