import type { SQL } from 'drizzle-orm';

import { and, desc, eq, gt, inArray, isNotNull, isNull, lt, lte, or, sql } from 'drizzle-orm';

import type { CertificateStatusEnum, EnrollmentsFiltersSchema, MultipleDeleteSchema } from '#imports';

import type { InsertEnrollment } from '../schema';

import db from '..';
import { $t } from '../../../shared/utils/i18n';
import { uploadFile } from '../../storage';
import { athlete, course, enrollment, season } from '../schema';
import { findSeason } from './seasons';

function buildEnrollmentFilters(filters?: EnrollmentsFiltersSchema) {
    const conditions: SQL[] = [];

    if (filters?.seasonId) {
        conditions.push(eq(enrollment.seasonId, filters.seasonId));
    }

    if (filters?.activityId) {
        conditions.push(eq(course.activityId, filters.activityId));
    }

    if (filters?.courseId) {
        conditions.push(eq(enrollment.courseId, filters.courseId));
    }

    if (filters?.certificateStatus && filters.certificateStatus.length > 0) {
        const certificateStatusConditions: Record<CertificateStatusEnum, SQL> = {
            missing: isNull(enrollment.certificateExpirationDate),
            expired: lte(enrollment.certificateExpirationDate, sql`CURRENT_DATE`),
            valid: gt(enrollment.certificateExpirationDate, sql`CURRENT_DATE`),
        };

        const selectedCertificateStatusConditions = filters.certificateStatus.map(
            (status) => certificateStatusConditions[status],
        );

        const certificateStatusCondition = or(...selectedCertificateStatusConditions);

        if (certificateStatusCondition) {
            conditions.push(certificateStatusCondition);
        }
    }

    return and(...conditions);
}

async function findLatestCertificate(athleteId: number, seasonId: number) {
    const currentSeason = await findSeason(seasonId);

    if (!currentSeason) {
        return undefined;
    }

    const [row] = await db
        .select({
            certificateExpirationDate: enrollment.certificateExpirationDate,
            certificateStorageKey: enrollment.certificateStorageKey,
        })
        .from(enrollment)
        .innerJoin(season, eq(season.id, enrollment.seasonId))
        .where(and(
            eq(enrollment.athleteId, athleteId),
            lt(season.startYear, currentSeason.startYear),
            isNull(enrollment.deletedAt),
            isNotNull(enrollment.certificateExpirationDate),
        ))
        .orderBy(desc(season.startYear))
        .limit(1);

    return row;
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
        .innerJoin(course, eq(enrollment.courseId, course.id))
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
            course: {
                columns: {
                    code: true,
                    name: true,
                    activityId: true,
                },
                with: {
                    activity: {
                        columns: {
                            name: true,
                        },
                    },
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
            activity: rest.course.activity,
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
            course: {
                with: {
                    activity: true,
                },
            },
        },
    });

    if (!result) {
        return result;
    }

    const payments = [
        {
            name: 'firstPayment',
            amount: result.firstPayment,
            date: result.firstPaymentDate,
            type: result.firstPaymentType,
        },
        {
            name: 'secondPayment',
            amount: result.secondPayment,
            date: result.secondPaymentDate,
            type: result.secondPaymentType,
        },
        {
            name: 'thirdPayment',
            amount: result.thirdPayment,
            date: result.thirdPaymentDate,
            type: result.thirdPaymentType,
        },
    ];

    const { certificateStorageKey, ...rest } = result;

    return {
        ...rest,
        payments,
        activity: rest.course.activity,
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
    const missingCertificate = !data.certificateExpirationDate && !data.certificateStorageKey;
    const inherited = missingCertificate
        ? await findLatestCertificate(data.athleteId, data.seasonId)
        : undefined;

    if (inherited) {
        const [created] = await db.insert(enrollment)
            .values({
                ...data,
                ...inherited,
            })
            .returning();

        return created;
    }

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
    const {
        firstPayment = null,
        firstPaymentDate = null,
        firstPaymentType = null,
        secondPayment = null,
        secondPaymentDate = null,
        secondPaymentType = null,
        thirdPayment = null,
        thirdPaymentDate = null,
        thirdPaymentType = null,
        certificateExpirationDate = null,
        certificateStorageKey: _,
        ...rest
    } = data;

    const [updated] = await db.update(enrollment)
        .set({
            ...rest,
            firstPayment,
            firstPaymentDate,
            firstPaymentType,
            secondPayment,
            secondPaymentDate,
            secondPaymentType,
            thirdPayment,
            thirdPaymentDate,
            thirdPaymentType,
            certificateExpirationDate,
            ...(certificateStorageKey !== undefined && { certificateStorageKey }),
        })
        .where(and(
            eq(enrollment.id, enrollmentId),
            isNull(enrollment.deletedAt),
        ))
        .returning();

    return updated;
}

export async function deleteEnrollments(data: MultipleDeleteSchema) {
    if (!data.ids.length) {
        return [];
    }

    const deleted = await db.update(enrollment)
        .set({ deletedAt: new Date() })
        .where(and(
            inArray(enrollment.id, data.ids),
            isNull(enrollment.deletedAt),
        ))
        .returning();

    return deleted;
}

export async function deleteEnrollment(enrollmentId: number) {
    const [deleted] = await db.update(enrollment)
        .set({ deletedAt: new Date() })
        .where(and(
            eq(enrollment.id, enrollmentId),
            isNull(enrollment.deletedAt),
        ))
        .returning();

    return deleted;
}
