import { desc, eq, inArray } from 'drizzle-orm';

import type { MultipleDelete } from '../../../shared/utils/zod-schemas';
import type { InsertAthlete } from '../schema';

import db from '..';
import { mapAddressToColumns, mapBirthplaceToColumns } from '../../utils/queries';
import { athlete } from '../schema';

export async function findAthletes() {
    return await db.query.athlete.findMany({
        orderBy: desc(athlete.id),
    });
}

export async function findAthlete(athleteId: number) {
    const result = await db.query.athlete.findFirst({
        where: eq(athlete.id, athleteId),
        with: {
            parent: true,
            enrollments: {
                with: {
                    season: true,
                    course: {
                        with: {
                            activity: true,
                        },
                    },
                },
            },
        },
    });

    if (!result) {
        return result;
    }

    const enrollments = result.enrollments
        .toSorted((athleteA, athleteB) => athleteB.season.endYear - athleteA.season.endYear)
        .map((enrollment) => {
            return {
                ...enrollment,
                activity: enrollment.course.activity,
            };
        });

    return {
        ...result,
        enrollments,
    };
}

export async function insertAthlete(data: InsertAthlete) {
    const { birthplace, address, ...rest } = data;

    const [created] = await db.insert(athlete)
        .values({
            ...rest,
            ...mapBirthplaceToColumns(birthplace),
            ...mapAddressToColumns(address),
        })
        .returning();

    return created;
}

export async function updateAthlete(athleteId: number, data: InsertAthlete) {
    const { birthplace, address, phoneNumber = null, email = null, parentId = null, ...rest } = data;

    const [updated] = await db.update(athlete)
        .set({
            ...rest,
            ...mapBirthplaceToColumns(birthplace),
            ...mapAddressToColumns(address),
            phoneNumber,
            email,
            parentId,
        })
        .where(eq(athlete.id, athleteId))
        .returning();

    return updated;
}

export async function deleteAthletes(data: MultipleDelete) {
    if (!data.ids.length) {
        return [];
    }

    const deleted = await db.delete(athlete)
        .where(inArray(athlete.id, data.ids))
        .returning();

    return deleted;
}

export async function deleteAthlete(athleteId: number) {
    const [deleted] = await db.delete(athlete)
        .where(eq(athlete.id, athleteId))
        .returning();

    return deleted;
}
