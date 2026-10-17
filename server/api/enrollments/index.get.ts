import { findEnrollments } from '~~/lib/db/queries/enrollments';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedQuery(event, EnrollmentsFiltersSchema.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    return await findEnrollments(result.data);
});
