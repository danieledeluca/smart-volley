import { findEnrollmentCertificateStorageKey } from '~~/lib/db/queries/enrollments';
import { getSignedFileUrl } from '~~/lib/storage';

export default defineAuthenticatedEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));

    const certificateStorageKey = await findEnrollmentCertificateStorageKey(id);

    if (!certificateStorageKey) {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: $t('form.field.certificate_storage_key.error.not_found'),
        }));
    }

    return {
        url: await getSignedFileUrl(certificateStorageKey),
    };
});
