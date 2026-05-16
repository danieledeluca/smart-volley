import { findEnrollmentCertificateStorageKey } from '~~/lib/db/queries/enrollments';
import { getSignedFileUrl } from '~~/lib/storage';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id') as string);

    const certificateStorageKey = await findEnrollmentCertificateStorageKey(id);

    if (!certificateStorageKey) {
        return sendError(event, createError({ statusCode: 404 }));
    }

    return {
        url: await getSignedFileUrl(certificateStorageKey),
    };
});
