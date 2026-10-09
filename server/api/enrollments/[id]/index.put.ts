import type { DrizzleError } from 'drizzle-orm';

import { updateEnrollment } from '~~/lib/db/queries/enrollments';
import { InsertEnrollment } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const routerParamsResult = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!routerParamsResult.success) {
        return sendZodError(event, routerParamsResult.error);
    }

    const formData = await readFormData(event);
    const result = InsertEnrollment.safeParse(Object.fromEntries(formData.entries()));

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        const enrollment = await updateEnrollment(result.data, routerParamsResult.data.id);

        if (!enrollment) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: $t('page.enrollment.error'),
            }));
        }

        return enrollment;
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
}, {
    roles: ['admin', 'manager'],
});
