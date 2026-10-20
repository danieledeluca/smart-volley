import type { SQL } from 'drizzle-orm';

import { and, desc, eq, gt, inArray, isNull, lte, or, sql } from 'drizzle-orm';

import type { CertificateStatus, EnrollmentsFilters, MultipleDelete } from '../../../shared/utils/zod-schemas';
import type { InsertEnrollment } from '../schema';

import db from '..';
import { deleteFile } from '../../storage';
import { course, enrollment } from '../schema';
import {
    deleteEnrollmentCertificates,
    findEnrollmentCertificateStorageKey,
    findEnrollmentLatestCertificate,
    uploadEnrollmentCertificate,
} from './certificates';

function buildEnrollmentFilters(filters?: EnrollmentsFilters) {
    const conditions: SQL[] = [];

    if (filters?.seasonId) {
        conditions.push(eq(enrollment.seasonId, filters.seasonId));
    }

    if (filters?.activityId) {
        conditions.push(inArray(
            enrollment.courseId,
            db.select({ id: course.id })
                .from(course)
                .where(eq(course.activityId, filters.activityId)),
        ));
    }

    if (filters?.courseId) {
        conditions.push(eq(enrollment.courseId, filters.courseId));
    }

    if (filters?.certificateStatus && filters.certificateStatus.length > 0) {
        const certificateStatusConditions: Record<CertificateStatus, SQL> = {
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

export async function findEnrollments(filters?: EnrollmentsFilters) {
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
        where: buildEnrollmentFilters(filters),
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

export async function findEnrollmentsForExport(ids: number[]) {
    return await db.query.enrollment.findMany({
        where: inArray(enrollment.id, ids),
        with: {
            athlete: {
                with: {
                    parent: true,
                },
            },
            season: true,
            course: {
                with: {
                    activity: true,
                },
            },
        },
        orderBy: desc(enrollment.id),
    });
}

export async function findEnrollment(enrollmentId: number) {
    const result = await db.query.enrollment.findFirst({
        where: eq(enrollment.id, enrollmentId),
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

export async function insertEnrollment(data: InsertEnrollment) {
    const missingCertificate = !data.certificateExpirationDate && !data.certificateStorageKey;

    const latestCertificate = missingCertificate
        ? await findEnrollmentLatestCertificate(data.athleteId, data.seasonId)
        : undefined;

    if (latestCertificate) {
        const [created] = await db.insert(enrollment)
            .values({
                ...data,
                ...latestCertificate,
            })
            .returning();

        return created;
    }

    const certificateStorageKey = await uploadEnrollmentCertificate(data);
    const { certificateStorageKey: _, ...rest } = data;

    try {
        const [created] = await db.insert(enrollment)
            .values({
                ...rest,
                ...(certificateStorageKey !== undefined && { certificateStorageKey }),
            })
            .returning();

        return created;
    } catch (error) {
        if (certificateStorageKey) {
            await deleteFile(certificateStorageKey);
        }

        throw error;
    }
}

export async function updateEnrollment(enrollmentId: number, data: InsertEnrollment) {
    const previousKey = await findEnrollmentCertificateStorageKey(enrollmentId);
    const certificateStorageKey = await uploadEnrollmentCertificate(data);
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

    let updated: typeof enrollment.$inferSelect | undefined;

    try {
        [updated] = await db.update(enrollment)
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
            .where(eq(enrollment.id, enrollmentId))
            .returning();
    } catch (error) {
        if (certificateStorageKey) {
            await deleteFile(certificateStorageKey);
        }

        throw error;
    }

    if (updated && certificateStorageKey !== undefined && certificateStorageKey !== previousKey) {
        await deleteEnrollmentCertificates([previousKey || null]);
    }

    if (!updated && certificateStorageKey) {
        await deleteFile(certificateStorageKey);
    }

    return updated;
}

export async function deleteEnrollments(data: MultipleDelete) {
    if (!data.ids.length) {
        return [];
    }

    const deleted = await db.delete(enrollment)
        .where(inArray(enrollment.id, data.ids))
        .returning();

    await deleteEnrollmentCertificates(deleted.map((row) => row.certificateStorageKey));

    return deleted;
}

export async function deleteEnrollment(enrollmentId: number) {
    const [deleted] = await db.delete(enrollment)
        .where(eq(enrollment.id, enrollmentId))
        .returning();

    await deleteEnrollmentCertificates([deleted?.certificateStorageKey || null]);

    return deleted;
}
