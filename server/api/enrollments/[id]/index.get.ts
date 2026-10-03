import { findEnrollment } from '~~/lib/db/queries/enrollments';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    const enrollment = await findEnrollment(result.data.id);

    if (!enrollment) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.enrollment.error'),
        });
    }

    return enrollment;
});
