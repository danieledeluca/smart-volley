import { and, desc, eq, inArray, isNotNull, lt } from 'drizzle-orm';
import { createError } from 'h3';

import type { InsertEnrollment } from '../schema';

import db from '..';
import { $t } from '../../../shared/utils/i18n';
import { deleteFile, uploadFile } from '../../storage';
import { enrollment, season } from '../schema';
import { findSeason } from './seasons';

export async function findEnrollmentLatestCertificate(athleteId: number, seasonId: number) {
    const currentSeason = await findSeason(seasonId);

    if (!currentSeason) {
        return undefined;
    }

    const [reference] = await db
        .select({
            certificateExpirationDate: enrollment.certificateExpirationDate,
            certificateStorageKey: enrollment.certificateStorageKey,
        })
        .from(enrollment)
        .innerJoin(season, eq(season.id, enrollment.seasonId))
        .where(and(
            eq(enrollment.athleteId, athleteId),
            lt(season.startYear, currentSeason.startYear),
            isNotNull(enrollment.certificateExpirationDate),
        ))
        .orderBy(desc(season.startYear))
        .limit(1);

    return reference;
}

export async function findEnrollmentCertificateStorageKey(enrollmentId: number) {
    const result = await db.query.enrollment.findFirst({
        where: eq(enrollment.id, enrollmentId),
        columns: {
            certificateStorageKey: true,
        },
    });

    return result?.certificateStorageKey;
}

export async function uploadEnrollmentCertificate(data: InsertEnrollment) {
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

export async function deleteEnrollmentCertificates(keys: (string | null)[]) {
    const candidates = [...new Set(keys.filter((key): key is string => Boolean(key)))];

    if (candidates.length === 0) {
        return;
    }

    const referenced = await db.selectDistinct({ key: enrollment.certificateStorageKey })
        .from(enrollment)
        .where(inArray(enrollment.certificateStorageKey, candidates));

    const referencedKeys = new Set(referenced.map(({ key }) => key));

    await Promise.all(candidates.filter((key) => !referencedKeys.has(key)).map((key) => deleteFile(key)));
}

export async function findAthletesCertificateStorageKeys(athleteIds: number[]) {
    const rows = await db.select({ key: enrollment.certificateStorageKey })
        .from(enrollment)
        .where(inArray(enrollment.athleteId, athleteIds));

    return rows.map(({ key }) => key);
}
