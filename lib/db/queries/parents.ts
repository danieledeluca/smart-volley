import { desc, eq, inArray } from 'drizzle-orm';

import type { MultipleDelete } from '../../../shared/utils/zod-schemas';
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
        with: {
            athletes: true,
        },
    });
}

export async function insertParent(data: InsertParent) {
    const [created] = await db.insert(parent)
        .values(data)
        .returning();

    return created;
}

export async function updateParent(parentId: number, data: InsertParent) {
    const { phoneNumber = null, email = null, ...rest } = data;

    const [updated] = await db.update(parent)
        .set({
            ...rest,
            phoneNumber,
            email,
        })
        .where(eq(parent.id, parentId))
        .returning();

    return updated;
}

export async function deleteParents(data: MultipleDelete) {
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
