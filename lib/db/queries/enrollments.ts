import type { SQL } from 'drizzle-orm';

import { and, desc, eq, gt, ilike, inArray, isNull, lte, sql } from 'drizzle-orm';

import type { CertificateStatusEnum, EnrollmentsFiltersSchema, MultipleDeleteSchema } from '#imports';

import type { InsertEnrollment } from '../schema';

import db from '..';
import { $t } from '../../../shared/utils/i18n';
import { uploadFile } from '../../storage';
import { athlete, enrollment } from '../schema';

function buildEnrollmentFilters(filters?: EnrollmentsFiltersSchema) {
    const conditions: SQL[] = [];

    if (filters?.athleteName) {
        conditions.push(ilike(athlete.name, `%${filters.athleteName}%`));
    }

    if (filters?.seasonId) {
        conditions.push(eq(enrollment.seasonId, filters.seasonId));
    }

    if (filters?.activityId) {
        conditions.push(eq(enrollment.activityId, filters.activityId));
    }

    if (filters?.courseId) {
        conditions.push(eq(enrollment.courseId, filters.courseId));
    }

    if (filters?.missingPayment) {
        conditions.push(isNull(enrollment[filters.missingPayment]));
    }

    if (filters?.certificateStatus) {
        const certificateStatusConditions: Record<CertificateStatusEnum, SQL> = {
            missing: isNull(enrollment.certificateExpirationDate),
            expired: lte(enrollment.certificateExpirationDate, sql`CURRENT_DATE`),
            valid: gt(enrollment.certificateExpirationDate, sql`CURRENT_DATE`),
        };

        conditions.push(certificateStatusConditions[filters.certificateStatus]);
    }

    return and(...conditions);
}

async function getCertificateStorageKey(data: InsertEnrollment) {
    if (!data.certificateStorageKey) {
        return null;
    }

    if (data.certificateStorageKey.size === 0) {
        return undefined;
    }

    try {
        const certificateStorageKey = await uploadFile(
            `certificates/${data.seasonId}/${data.athleteId}/${Date.now()}.pdf`,
            data.certificateStorageKey,
        );

        return certificateStorageKey;
    } catch {
        throw new Error($t('form.field.certificate_storage_key.error.upload'));
    }
}

export async function findEnrollments(filters?: EnrollmentsFiltersSchema) {
    const filteredIds = await db.select({ id: enrollment.id })
        .from(enrollment)
        .innerJoin(athlete, and(
            eq(enrollment.athleteId, athlete.id),
            isNull(athlete.deletedAt),
        ))
        .where(buildEnrollmentFilters(filters));

    const result = await db.query.enrollment.findMany({
        with: {
            athlete: {
                columns: {
                    id: true,
                    name: true,
                    fiscalCode: true,
                },
            },
            season: {
                columns: {
                    startYear: true,
                    endYear: true,
                },
            },
            activity: {
                columns: {
                    name: true,
                },
            },
            course: {
                columns: {
                    name: true,
                    description: true,
                },
            },
        },
        where: and(
            inArray(enrollment.id, filteredIds.map((filter) => filter.id)),
            isNull(enrollment.deletedAt),
        ),
        orderBy: desc(enrollment.id),
    });

    return result.map(({ certificateStorageKey, ...rest }) => {
        return {
            ...rest,
            certificateFile: Boolean(certificateStorageKey),
        };
    });
}

export async function findEnrollment(enrollmentId: number) {
    const result = await db.query.enrollment.findFirst({
        where: and(
            eq(enrollment.id, enrollmentId),
            isNull(enrollment.deletedAt),
        ),
        with: {
            athlete: true,
            season: true,
            activity: true,
            course: true,
        },
    });

    if (!result) {
        return result;
    }

    const { certificateStorageKey, ...rest } = result;

    return {
        ...rest,
        certificateFile: Boolean(certificateStorageKey),
    };
}

export async function findEnrollmentCertificateStorageKey(enrollmentId: number) {
    const result = await db.query.enrollment.findFirst({
        where: and(
            eq(enrollment.id, enrollmentId),
            isNull(enrollment.deletedAt),
        ),
        columns: {
            certificateStorageKey: true,
        },
    });

    return result?.certificateStorageKey;
}

export async function insertEnrollment(data: InsertEnrollment) {
    const certificateStorageKey = await getCertificateStorageKey(data);
    const { certificateStorageKey: _, ...rest } = data;

    const [created] = await db.insert(enrollment)
        .values({
            ...rest,
            ...(certificateStorageKey !== undefined && { certificateStorageKey }),
        })
        .returning();

    return created;
}

export async function updateEnrollment(data: InsertEnrollment, enrollmentId: number) {
    const certificateStorageKey = await getCertificateStorageKey(data);
    const { certificateStorageKey: _, ...rest } = data;

    const [updated] = await db.update(enrollment)
        .set({
            ...rest,
            ...(certificateStorageKey !== undefined && { certificateStorageKey }),
        })
        .where(eq(enrollment.id, enrollmentId))
        .returning();

    return updated;
}

export async function deleteEnrollments(data: MultipleDeleteSchema) {
    if (!data.ids.length) {
        return [];
    }

    const deleted = await db.update(enrollment)
        .set({ deletedAt: new Date() })
        .where(inArray(enrollment.id, data.ids))
        .returning();

    return deleted;
}

export async function deleteEnrollment(enrollmentId: number) {
    const [deleted] = await db.update(enrollment)
        .set({ deletedAt: new Date() })
        .where(eq(enrollment.id, enrollmentId))
        .returning();

    return deleted;
}
