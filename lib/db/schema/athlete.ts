import type { SerializeObject } from 'nitropack';

import { relations, sql } from 'drizzle-orm';
import { char, date, integer, pgTable, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import type { findAthlete, findAthletes } from '../queries/athletes';

import { $t } from '../../../shared/utils/i18n';
import { FISCAL_CODE_REGEX, PHONE_NUMBER_REGEX } from '../../utils/constants';
import { enrollment } from './enrollment';
import { parent } from './parent';

export const athlete = pgTable('athlete', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    birthdate: date().notNull(),
    birthplace: text().notNull(),
    fiscalCode: char({ length: 16 }).notNull().unique(),
    city: text().notNull(),
    address: text().notNull(),
    phoneNumber: varchar({ length: 15 }),
    email: varchar({ length: 255 }),
    parentId: integer().references(() => parent.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    uniqueIndex().on(table.phoneNumber).where(sql`${table.phoneNumber} IS NOT NULL`),
    uniqueIndex().on(table.email).where(sql`${table.email} IS NOT NULL`),
]);

export const athleteRelations = relations(athlete, ({ one, many }) => ({
    parent: one(parent, {
        fields: [athlete.parentId],
        references: [parent.id],
    }),
    enrollments: many(enrollment),
}));

export const InsertAthlete = createInsertSchema(athlete, {
    name: z.string($t('form.field.name.required')).trim().nonempty($t('form.field.name.required')),
    birthdate: z.string($t('form.field.birthdate.required'))
        .refine((value) => new Date(value) <= new Date(), $t('form.field.birthdate.error')),
    birthplace: z.string($t('form.field.birthplace.required')).trim().nonempty($t('form.field.birthplace.required')),
    fiscalCode: z.string($t('form.field.fiscal_code.required'))
        .transform((value) => value.toUpperCase())
        .pipe(z.string().regex(FISCAL_CODE_REGEX, $t('form.field.fiscal_code.error'))),
    city: z.string($t('form.field.city.required')).trim().nonempty($t('form.field.city.required')),
    address: z.string($t('form.field.address.required')).trim().nonempty($t('form.field.address.required')),
    phoneNumber: z.string()
        .refine((value) => !value || PHONE_NUMBER_REGEX.test(value), $t('form.field.phone_number.error'))
        .optional(),
    email: z.string()
        .refine((value) => !value || z.email().safeParse(value).success, $t('form.field.email.error'))
        .optional(),
    parentId: z.union([z.coerce.number(), z.literal('').transform(() => undefined)]).optional(),
}).omit({
    createdAt: true,
    updatedAt: true,
});

export type InsertAthlete = z.infer<typeof InsertAthlete>;
export type FindAthletes = SerializeObject<Awaited<ReturnType<typeof findAthletes>>[number]>;
export type FindAthlete = SerializeObject<NonNullable<Awaited<ReturnType<typeof findAthlete>>>>;
