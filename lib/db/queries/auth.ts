import { desc, eq } from 'drizzle-orm';

import type { UserRole } from '../schema';

import db from '..';
import { user } from '../schema';

export async function findUsers() {
    return await db.query.user.findMany({
        orderBy: desc(user.id),
    });
}

export async function updateUserRole(userId: number, userRole: UserRole) {
    const [updated] = await db.update(user)
        .set({ role: userRole || null })
        .where(eq(user.id, userId))
        .returning();

    return updated;
}
