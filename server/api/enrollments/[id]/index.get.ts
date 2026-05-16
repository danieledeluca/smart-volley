import { findEnrollment } from '~~/lib/db/queries/enrollments';
import { getSignedFileUrl } from '~~/lib/storage';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id') as string);

    const enrollment = await findEnrollment(id);

    if (!enrollment) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.enrollment.error'),
        });
    }

    return {
        ...enrollment,
        certificateStorageKey: enrollment.certificateStorageKey
            ? await getSignedFileUrl(enrollment.certificateStorageKey)
            : null,
    };
});
