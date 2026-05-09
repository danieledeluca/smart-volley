import { asc } from 'drizzle-orm';

import type { InsertActivity } from '../schema';

import db from '..';
import { activity } from '../schema';

export async function findActivities() {
    return await db.query.activity.findMany({
        orderBy: asc(activity.name),
    });
}

export async function insertActivity(data: InsertActivity) {
    const [created] = await db.insert(activity).values(data).returning();

    return created;
}
