import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp, unique } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import { $t } from '../../../shared/utils/i18n';
import { enrollment } from './enrollment';

export const season = pgTable('season', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    startYear: integer().notNull(),
    endYear: integer().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    unique().on(table.startYear, table.endYear),
]);

export const seasonRelations = relations(season, ({ many }) => {
    return {
        enrollments: many(enrollment),
    };
});

export const InsertSeason = createInsertSchema(season, {
    startYear: z.coerce.number($t('form.field.start_year.required')).transform((value) => Number(value)),
    endYear: z.coerce.number($t('form.field.end_year.required')).transform((value) => Number(value)),
}).omit({
    createdAt: true,
    updatedAt: true,
}).refine((data) => data.endYear === data.startYear + 1, {
    message: $t('form.field.end_year.error'),
    path: ['endYear'],
});

export type InsertSeason = z.infer<typeof InsertSeason>;
