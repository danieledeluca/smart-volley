import { findCourse } from '~~/lib/db/queries/courses';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    const course = await findCourse(result.data.id);

    if (!course) {
        throw createError({
            statusCode: 404,
            message: $t('page.course.error'),
        });
    }

    return course;
});
