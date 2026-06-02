import type { DrizzleError } from 'drizzle-orm';

import { updateEnrollment } from '~~/lib/db/queries/enrollments';
import { InsertEnrollment } from '~~/lib/db/schema';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const formData = await readFormData(event);
    const result = InsertEnrollment.safeParse(Object.fromEntries(formData.entries()));

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    try {
        return await updateEnrollment(result.data, id);
    } catch (error) {
        sendDbError(event, error as DrizzleError);
    }
});
