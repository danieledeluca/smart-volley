import { and, asc, eq, ilike, isNull } from 'drizzle-orm';

import type { InsertAthlete } from '../schema';

import db from '..';
import { athlete, enrollment } from '../schema';

export async function findAthletes(athleteName?: string) {
    return await db.query.athlete.findMany({
        where: and(
            athleteName ? ilike(athlete.name, `%${athleteName}%`) : undefined,
            isNull(athlete.deletedAt),
        ),
        columns: {
            id: true,
            name: true,
            fiscalCode: true,
            phoneNumber: true,
            email: true,
        },
        orderBy: asc(athlete.name),
    });
}

export async function findAthlete(athleteId: number) {
    const result = await db.query.athlete.findFirst({
        where: and(
            eq(athlete.id, athleteId),
            isNull(athlete.deletedAt),
        ),
        with: {
            parent: true,
            enrollments: {
                where: isNull(enrollment.deletedAt),
                with: {
                    season: true,
                    activity: true,
                    course: true,
                },
            },
        },
    });

    if (!result) {
        return result;
    }

    result.enrollments.sort((a, b) => b.season.endYear - a.season.endYear);

    return result;
}

export async function insertAthlete(data: InsertAthlete) {
    const [created] = await db.insert(athlete)
        .values(data)
        .returning();

    return created;
}

export async function updateAthlete(data: InsertAthlete, athleteId: number) {
    const [updated] = await db.update(athlete)
        .set(data)
        .where(eq(athlete.id, athleteId))
        .returning();

    return updated;
}

export async function deleteAthlete(athleteId: number) {
    const [deleted] = await db.update(athlete)
        .set({ deletedAt: new Date() })
        .where(eq(athlete.id, athleteId))
        .returning();

    return deleted;
}
