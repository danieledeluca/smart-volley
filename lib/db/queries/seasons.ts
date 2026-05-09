import { desc } from 'drizzle-orm';

import type { InsertSeason } from '../schema';

import db from '..';
import { season } from '../schema';

export async function findSeasons() {
    return await db.query.season.findMany({
        orderBy: desc(season.startYear),
    });
}

export async function insertSeason(data: InsertSeason) {
    const [created] = await db.insert(season).values(data).returning();

    return created;
}
