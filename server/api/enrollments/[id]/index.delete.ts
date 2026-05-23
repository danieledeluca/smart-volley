import { deleteEnrollment } from '~~/lib/db/queries/enrollments';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const deleted = await deleteEnrollment(id);

    if (!deleted) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.enrollment.error'),
        });
    }

    setResponseStatus(event, 204);
});
