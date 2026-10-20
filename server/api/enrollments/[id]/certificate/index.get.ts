import { findEnrollmentCertificateStorageKey } from '~~/lib/db/queries/certificates';
import { getSignedFileUrl } from '~~/lib/storage';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, DetailPageRouterParamsSchema.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    const certificateStorageKey = await findEnrollmentCertificateStorageKey(result.data.id);

    if (!certificateStorageKey) {
        throw createError({
            statusCode: 404,
            message: $t('form.field.certificate_storage_key.error.not_found'),
        });
    }

    return await getSignedFileUrl(certificateStorageKey);
});
