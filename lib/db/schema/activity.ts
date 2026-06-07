import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import type { insertActivity } from '../queries/activities';

import { $t } from '../../../shared/utils/i18n';
import { course } from './course';

export const activity = pgTable('activity', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull().unique(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
});

export const activityRelations = relations(activity, ({ many }) => {
    return {
        courses: many(course),
    };
});

export const InsertActivity = createInsertSchema(activity, {
    name: z.string($t('form.field.activity_name.required')).trim().nonempty($t('form.field.activity_name.required')),
}).omit({
    createdAt: true,
    updatedAt: true,
});

export type InsertActivity = z.infer<typeof InsertActivity>;
export type InsertedActivity = Awaited<ReturnType<typeof insertActivity>>;
