import type { DrizzleError } from 'drizzle-orm';

import { updateCourse } from '~~/lib/db/queries/courses';
import { InsertCourse } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const routerParamsResult = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!routerParamsResult.success) {
        return sendZodError(event, routerParamsResult.error);
    }

    const result = await readValidatedBody(event, InsertCourse.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        const course = await updateCourse(result.data, routerParamsResult.data.id);

        if (!course) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: $t('page.course.error'),
            }));
        }

        return course;
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
}, {
    roles: ['admin', 'manager'],
});
