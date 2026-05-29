import { asc, isNull } from 'drizzle-orm';

import type { InsertParent } from '../schema';

import db from '..';
import { parent } from '../schema';

export async function findParents() {
    return await db.query.parent.findMany({
        where: isNull(parent.deletedAt),
        orderBy: asc(parent.name),
    });
}

export async function insertParent(data: InsertParent) {
    const [created] = await db.insert(parent)
        .values(data)
        .returning();

    return created;
}
