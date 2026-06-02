import { asc, eq, ilike } from 'drizzle-orm';

import type { InsertParent } from '../schema';

import db from '..';
import { parent } from '../schema';

export async function findParents(parentName?: string) {
    return await db.query.parent.findMany({
        where: parentName ? ilike(parent.name, `%${parentName}%`) : undefined,
        orderBy: asc(parent.name),
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

export async function deleteParent(parentId: number) {
    const [deleted] = await db.delete(parent)
        .where(eq(parent.id, parentId))
        .returning();

    return deleted;
}
