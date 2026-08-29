import { desc, eq, inArray } from 'drizzle-orm';

import type { MultipleDeleteSchema } from '#imports';

import type { InsertParent } from '../schema';

import db from '..';
import { parent } from '../schema';

export async function findParents() {
    return await db.query.parent.findMany({
        orderBy: desc(parent.id),
    });
}

export async function findParent(parentId: number) {
    return await db.query.parent.findFirst({
        where: eq(parent.id, parentId),
    });
}

export async function insertParent(data: InsertParent) {
    const [created] = await db.insert(parent)
        .values(data)
        .returning();

    return created;
}

export async function updateParent(data: InsertParent, parentId: number) {
    const [updated] = await db.update(parent)
        .set(data)
        .where(eq(parent.id, parentId))
        .returning();

    return updated;
}

export async function deleteParents(data: MultipleDeleteSchema) {
    if (!data.ids.length) {
        return [];
    }

    const deleted = await db.delete(parent)
        .where(inArray(parent.id, data.ids))
        .returning();

    return deleted;
}

export async function deleteParent(parentId: number) {
    const [deleted] = await db.delete(parent)
        .where(eq(parent.id, parentId))
        .returning();

    return deleted;
}
