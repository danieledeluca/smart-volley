import { asc, eq } from 'drizzle-orm';

import type { InsertCourse } from '../schema';

import db from '..';
import { course } from '../schema';

export async function findCourses() {
    return await db.query.course.findMany({
        with: {
            activity: true,
        },
        orderBy: asc(course.name),
    });
}

export async function findCourse(courseId: number) {
    return await db.query.course.findFirst({
        where: eq(course.id, courseId),
    });
}

export async function insertCourse(data: InsertCourse) {
    const [created] = await db.insert(course)
        .values(data)
        .returning();

    return created;
}

export async function updateCourse(data: InsertCourse, courseId: number) {
    const [updated] = await db.update(course)
        .set(data)
        .where(eq(course.id, courseId))
        .returning();

    return updated;
}
