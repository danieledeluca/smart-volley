import { asc, eq } from 'drizzle-orm';

import type { InsertActivity } from '../schema';

import db from '..';
import { activity } from '../schema';

export async function findActivities() {
    return await db.query.activity.findMany({
        orderBy: asc(activity.name),
    });
}

export async function findActivity(activityId: number) {
    return await db.query.activity.findFirst({
        where: eq(activity.id, activityId),
    });
}

export async function insertActivity(data: InsertActivity) {
    const [created] = await db.insert(activity)
        .values(data)
        .returning();

    return created;
}

export async function updateActivity(data: InsertActivity, activityId: number) {
    const [updated] = await db.update(activity)
        .set(data)
        .where(eq(activity.id, activityId))
        .returning();

    return updated;
}
