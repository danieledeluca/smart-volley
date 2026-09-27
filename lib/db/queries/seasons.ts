import { desc, eq } from 'drizzle-orm';

import type { InsertSeason } from '../schema';

import db from '..';
import { season } from '../schema';

export async function findSeasons() {
    return await db.query.season.findMany({
        orderBy: desc(season.startYear),
    });
}

export async function findSeason(seasonId: number) {
    return await db.query.season.findFirst({
        where: eq(season.id, seasonId),
    });
}

export async function insertSeason(data: InsertSeason) {
    const [created] = await db.insert(season)
        .values(data)
        .returning();

    return created;
}

export async function updateSeason(data: InsertSeason, seasonId: number) {
    const [updated] = await db.update(season)
        .set(data)
        .where(eq(season.id, seasonId))
        .returning();

    return updated;
}
