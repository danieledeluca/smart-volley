import { findEnrollmentCertificateStorageKey } from '~~/lib/db/queries/enrollments';
import { getSignedFileUrl } from '~~/lib/storage';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    const certificateStorageKey = await findEnrollmentCertificateStorageKey(result.data.id);

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
