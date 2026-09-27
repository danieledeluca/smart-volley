import { findCourse } from '~~/lib/db/queries/courses';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const course = await findCourse(id);

    if (!course) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.course.error'),
        });
    }

    return course;
});
