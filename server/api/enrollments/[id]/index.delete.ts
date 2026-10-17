import { deleteEnrollment } from '~~/lib/db/queries/enrollments';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    const enrollment = await deleteEnrollment(result.data.id);

    if (!enrollment) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.enrollment.error'),
        });
    }

    setResponseStatus(event, 204);
}, {
    roles: ['admin', 'manager'],
});
