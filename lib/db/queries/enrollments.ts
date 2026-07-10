import type { SQL } from 'drizzle-orm';

import { and, desc, eq, gt, ilike, inArray, isNull, lte, or, sql } from 'drizzle-orm';

import type { CertificateStatusEnum, EnrollmentsFiltersSchema, MultipleDeleteSchema } from '#imports';

import type { EnrollmentPaymentField, EnrollmentPaymentTypes, InsertEnrollment } from '../schema';

import db from '..';
import { $t } from '../../../shared/utils/i18n';
import { uploadFile } from '../../storage';
import { athlete, course, enrollment } from '../schema';

type Payment = {
    name: EnrollmentPaymentField;
    amount: string | null;
    date: string | null;
    type: EnrollmentPaymentTypes[number] | null;
};

function buildEnrollmentFilters(filters?: EnrollmentsFiltersSchema) {
    const conditions: SQL[] = [];

    if (filters?.athleteName) {
        conditions.push(ilike(athlete.name, `%${filters.athleteName}%`));
    }

    if (filters?.seasonId) {
        conditions.push(eq(enrollment.seasonId, filters.seasonId));
    }

    if (filters?.activityId) {
        conditions.push(eq(course.activityId, filters.activityId));
    }

    if (filters?.courseId) {
        conditions.push(eq(enrollment.courseId, filters.courseId));
    }

    if (filters?.missingPayment) {
        conditions.push(isNull(enrollment[filters.missingPayment]));
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
                },
                with: {
                    activity: {
                        columns: {
                            key: true,
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

    const payments: Payment[] = result.course.activity.key === 'volley'
        ? [
                {
                    name: 'volleyAccount',
                    amount: result.volleyAccount,
                    date: result.volleyAccountDate,
                    type: result.volleyAccountType,
                },
                {
                    name: 'volleyBalance',
                    amount: result.volleyBalance,
                    date: result.volleyBalanceDate,
                    type: result.volleyBalanceType,
                },
                {
                    name: 'volleySecondBalance',
                    amount: result.volleySecondBalance,
                    date: result.volleySecondBalanceDate,
                    type: result.volleySecondBalanceType,
                },
            ]
        : result.course.activity.key === 'gymnastics'
            ? [
                    {
                        name: 'gymnasticsFirstInstallment',
                        amount: result.gymnasticsFirstInstallment,
                        date: result.gymnasticsFirstInstallmentDate,
                        type: result.gymnasticsFirstInstallmentType,
                    },
                    {
                        name: 'gymnasticsSecondInstallment',
                        amount: result.gymnasticsSecondInstallment,
                        date: result.gymnasticsSecondInstallmentDate,
                        type: result.gymnasticsSecondInstallmentType,
                    },
                    {
                        name: 'gymnasticsThirdInstallment',
                        amount: result.gymnasticsThirdInstallment,
                        date: result.gymnasticsThirdInstallmentDate,
                        type: result.gymnasticsThirdInstallmentType,
                    },
                ]
            : [];

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
