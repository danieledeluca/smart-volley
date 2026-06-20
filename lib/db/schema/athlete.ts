import type { SerializeObject } from 'nitropack';

import { relations, sql } from 'drizzle-orm';
import { char, date, integer, pgTable, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import type { findAthlete, findAthletes, insertAthlete, updateAthlete } from '../queries/athletes';

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
    parentId: integer().references(() => parent.id, { onDelete: 'set null' }),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp(),
}, (table) => [
    uniqueIndex().on(table.phoneNumber).where(sql`${table.phoneNumber} IS NOT NULL`),
    uniqueIndex().on(table.email).where(sql`${table.email} IS NOT NULL`),
]);

export const athleteRelations = relations(athlete, ({ one, many }) => {
    return {
        parent: one(parent, {
            fields: [athlete.parentId],
            references: [parent.id],
        }),
        enrollments: many(enrollment),
    };
});

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
        .transform((value) => value || undefined)
        .refine((value) => !value || PHONE_NUMBER_REGEX.test(value), $t('form.field.phone_number.error'))
        .optional(),
    email: z.string()
        .transform((value) => value || undefined)
        .refine((value) => !value || z.email().safeParse(value).success, $t('form.field.email.error'))
        .optional(),
    parentId: z.union([z.literal('').transform(() => undefined), z.coerce.number()]).optional(),
}).omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});

export type InsertAthlete = z.infer<typeof InsertAthlete>;
export type InsertedAthlete = Awaited<ReturnType<typeof insertAthlete>>;
export type SelectAthletes = SerializeObject<Awaited<ReturnType<typeof findAthletes>>[number]>;
export type SelectAthleteWithRelations = SerializeObject<NonNullable<Awaited<ReturnType<typeof findAthlete>>>>;
export type UpdatedAthlete = Awaited<ReturnType<typeof updateAthlete>>;
