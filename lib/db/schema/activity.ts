import type { SerializeObject } from 'nitropack';

import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import type { findActivities, insertActivity, updateActivity } from '../queries/activities';

import { $t } from '../../../shared/utils/i18n';
import { DEFAULT_ACTIVITY_ICON } from '../../utils/constants';
import { isValidActivityIcon, normalizeActivityIcon } from '../../utils/icons';
import { course } from './course';

export const activity = pgTable('activity', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull().unique(),
    icon: text().notNull().default(DEFAULT_ACTIVITY_ICON),
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
    icon: z.string($t('form.field.activity_icon.required'))
        .trim()
        .nonempty($t('form.field.activity_icon.required'))
        .transform(normalizeActivityIcon)
        .refine(isValidActivityIcon, $t('form.field.activity_icon.error')),
}).omit({
    createdAt: true,
    updatedAt: true,
});

export type InsertActivity = z.infer<typeof InsertActivity>;
export type InsertedActivity = Awaited<ReturnType<typeof insertActivity>>;
export type SelectActivities = Awaited<ReturnType<typeof findActivities>>[number];
export type SelectActivitiesSerialized = SerializeObject<SelectActivities>;
export type UpdatedActivity = Awaited<ReturnType<typeof updateActivity>>;
