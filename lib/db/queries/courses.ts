import { asc } from 'drizzle-orm';

import type { InsertCourse } from '../schema';

import db from '..';
import { course } from '../schema';

export async function findCourses() {
    return await db.query.course.findMany({
        orderBy: asc(course.name),
    });
}

export async function insertCourse(data: InsertCourse) {
    const [created] = await db.insert(course)
        .values(data)
        .returning();

    return created;
}
