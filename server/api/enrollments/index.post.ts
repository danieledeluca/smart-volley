import type { DrizzleError } from 'drizzle-orm';

import { insertEnrollment } from '~~/lib/db/queries/enrollments';
import { InsertEnrollment } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const formData = await readFormData(event);
    const result = InsertEnrollment.safeParse(Object.fromEntries(formData.entries()));

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await insertEnrollment(result.data);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
