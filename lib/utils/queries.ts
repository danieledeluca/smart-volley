import type { InsertAthlete, InsertEnrollment } from '../db/schema';

import { uploadFile } from '../storage';

export function mapBirthplaceToColumns(birthplace: InsertAthlete['birthplace']) {
    return {
        birthplacePostalCode: birthplace.postalCode || null,
        birthplaceCity: birthplace.city || null,
        birthplaceProvince: birthplace.province || null,
        birthplaceRegion: birthplace.region || null,
        birthplaceCountry: birthplace.country,
        birthplaceFormattedAddress: birthplace.formattedAddress,
        birthplacePlaceId: birthplace.placeId,
    };
}

export function mapAddressToColumns(address: InsertAthlete['address']) {
    return {
        addressStreet: address.street,
        addressPostalCode: address.postalCode,
        addressCity: address.city,
        addressProvince: address.province,
        addressRegion: address.region,
        addressCountry: address.country,
        addressFormattedAddress: address.formattedAddress,
        addressPlaceId: address.placeId,
    };
}

export async function getCertificateStorageKey(data: InsertEnrollment) {
    if (!data.certificateStorageKey) {
        return null;
    }

    if (data.certificateStorageKey.size === 0) {
        return undefined;
    }

    try {
        const certificateStorageKey = `certificates/${data.seasonId}/${data.athleteId}/${Date.now()}.pdf`;

        await uploadFile(certificateStorageKey, data.certificateStorageKey);

        return certificateStorageKey;
    } catch {
        throw createError({
            statusCode: 422,
            statusMessage: $t('form.field.certificate_storage_key.error.upload'),
        });
    }
}
