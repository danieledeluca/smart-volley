import { deleteEnrollment } from '~~/lib/db/queries/enrollments';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    const deleted = await deleteEnrollment(result.data.id);

    if (!deleted) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.enrollment.error'),
        });
    }

    setResponseStatus(event, 204);
}, {
    roles: ['admin', 'manager'],
});
