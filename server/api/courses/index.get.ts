import { findCourses } from '~~/lib/db/queries/courses';

export default defineAuthenticatedEventHandler(async () => {
    return await findCourses();
});
