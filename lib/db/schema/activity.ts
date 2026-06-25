import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import type { insertActivity } from '../queries/activities';

import { $t } from '../../../shared/utils/i18n';
import { course } from './course';

export const activityKey = pgEnum('activity_key', ['volley', 'gymnastics']);

export const activity = pgTable('activity', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    key: activityKey().notNull().unique(),
    name: text().notNull().unique(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    unique().on(table.key, table.name),
]);

export const activityRelations = relations(activity, ({ many }) => {
    return {
        courses: many(course),
    };
});

export const InsertActivity = createInsertSchema(activity, {
    key: z.enum(activityKey.enumValues, $t('form.field.activity_key.required')),
    name: z.string($t('form.field.activity_name.required')).trim().nonempty($t('form.field.activity_name.required')),
}).omit({
    createdAt: true,
    updatedAt: true,
});

export type ActivityKeys = typeof activityKey.enumValues;

export type InsertActivity = z.infer<typeof InsertActivity>;
export type InsertedActivity = Awaited<ReturnType<typeof insertActivity>>;
