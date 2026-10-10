import type { SerializeObject } from 'nitropack';

import { and, eq, isNull, sql } from 'drizzle-orm';

import db from '..';
import { activity, athlete, course, enrollment, season } from '../schema';

export async function findDashboardStats(seasonStartYear: number) {
    const payments = sql`(
        coalesce(${enrollment.firstPayment}, 0)
        + coalesce(${enrollment.secondPayment}, 0)
        + coalesce(${enrollment.thirdPayment}, 0)
    )`;
    const inCurrent = sql`${season.startYear} = ${seasonStartYear}`;
    const inPrevious = sql`${season.endYear} = ${seasonStartYear}`;
    const expiring = sql`${inCurrent}
        AND ${enrollment.certificateExpirationDate} > current_date
        AND ${enrollment.certificateExpirationDate} <= current_date + 30`;

    const result = await db.select({
        activityId: activity.id,
        activityName: activity.name,
        totalEnrollments: sql<number>`count(*)::int`,
        totalPayments: sql<string>`coalesce(sum(${payments}), 0)::text`,
        currentEnrollments: sql<number>`(count(*) FILTER (WHERE ${inCurrent}))::int`,
        previousEnrollments: sql<number>`(count(*) FILTER (WHERE ${inPrevious}))::int`,
        currentPayments: sql<string>`coalesce(sum(${payments}) FILTER (WHERE ${inCurrent}), 0)::text`,
        previousPayments: sql<string>`coalesce(sum(${payments}) FILTER (WHERE ${inPrevious}), 0)::text`,
        expiringCertificates: sql<number>`(count(*) FILTER (WHERE ${expiring}))::int`,
    })
        .from(enrollment)
        .innerJoin(athlete, and(eq(enrollment.athleteId, athlete.id), isNull(athlete.deletedAt)))
        .innerJoin(season, eq(enrollment.seasonId, season.id))
        .innerJoin(course, eq(enrollment.courseId, course.id))
        .innerJoin(activity, eq(course.activityId, activity.id))
        .where(isNull(enrollment.deletedAt))
        .groupBy(activity.id, activity.name)
        .orderBy(activity.name);

    return result;
}

export type DashboardStats = SerializeObject<Awaited<ReturnType<typeof findDashboardStats>>[number]>;
