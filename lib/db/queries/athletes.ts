import { asc, eq, ilike } from 'drizzle-orm';

import type { InsertAthlete } from '../schema';

import db from '..';
import { athlete } from '../schema';

export async function findAthletes(athleteName?: string) {
    return await db.query.athlete.findMany({
        where: athleteName ? ilike(athlete.name, `%${athleteName}%`) : undefined,
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
        where: eq(athlete.id, athleteId),
        with: {
            parent: true,
            enrollments: {
                columns: {
                    id: true,
                },
                with: {
                    season: true,
                    activity: true,
                    course: true,
                },
            },
        },
    });

    result?.enrollments.sort((a, b) => b.season.endYear - a.season.endYear);

    return result;
}

export async function insertAthlete(data: InsertAthlete) {
    const [created] = await db.insert(athlete).values({
        ...data,
        phoneNumber: data.phoneNumber || undefined,
        email: data.email || undefined,
    }).returning();

    return created;
}
