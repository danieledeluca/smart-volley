import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import type { insertCourse } from '../queries/courses';

import { $t } from '../../../shared/utils/i18n';
import { activity } from './activity';
import { enrollment } from './enrollment';

export const course = pgTable('course', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    code: text().notNull().unique(),
    name: text(),
    activityId: integer().notNull().references(() => activity.id),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
});

export const courseRelations = relations(course, ({ one, many }) => {
    return {
        activity: one(activity, {
            fields: [course.activityId],
            references: [activity.id],
        }),
        enrollments: many(enrollment),
    };
});

export const InsertCourse = createInsertSchema(course, {
    code: z.string($t('form.field.course_code.required')).trim().nonempty($t('form.field.course_code.required')),
    name: z.string().trim().transform((value) => value || undefined).optional(),
    activityId: z.coerce.number($t('form.field.activity_id.required')),
}).omit({
    createdAt: true,
    updatedAt: true,
});

export type InsertCourse = z.infer<typeof InsertCourse>;
export type InsertedCourse = Awaited<ReturnType<typeof insertCourse>>;
