import { findEnrollment } from '~~/lib/db/queries/enrollments';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id') as string);

    const enrollment = await findEnrollment(id);

    if (!enrollment) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.enrollment.error'),
        });
    }

    return enrollment;
});
