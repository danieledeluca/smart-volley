import type { SQL } from 'drizzle-orm';

import { and, eq, gt, ilike, inArray, isNull, lte, sql } from 'drizzle-orm';

import type { CertificateStatusEnum, EnrollmentsFiltersSchema } from '#imports';

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

export async function findEnrollments(filters?: EnrollmentsFiltersSchema) {
    const filteredIds = await db.select({ id: enrollment.id })
        .from(enrollment)
        .innerJoin(athlete, eq(enrollment.athleteId, athlete.id))
        .where(buildEnrollmentFilters(filters));

    const result = await db.query.enrollment.findMany({
        with: {
            athlete: true,
            season: true,
            activity: true,
            course: true,
        },
        where: inArray(enrollment.id, filteredIds.map((filter) => filter.id)),
    });

    result.sort((a, b) => a.athlete.name.localeCompare(b.athlete.name));

    return result;
}

export async function findEnrollment(enrollmentId: number) {
    return await db.query.enrollment.findFirst({
        where: eq(enrollment.id, enrollmentId),
        with: {
            athlete: true,
            season: true,
            activity: true,
            course: true,
        },
    });
}

export async function insertEnrollment(data: InsertEnrollment) {
    let certificateStorageKey: string | undefined;

    if (data.certificateStorageKey) {
        try {
            certificateStorageKey = await uploadFile(
                `certificates/${data.seasonId}/${data.athleteId}/${Date.now()}.pdf`,
                data.certificateStorageKey,
            );
        } catch {
            throw new Error($t('form.field.certificate_storage_key.error.upload'));
        }
    }

    const [created] = await db.insert(enrollment).values({
        ...data,
        certificateStorageKey,
    }).returning();

    return created;
}
