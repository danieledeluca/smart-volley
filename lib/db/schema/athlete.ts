import type { SerializeObject } from 'nitropack';

import { relations, sql } from 'drizzle-orm';
import { char, date, index, integer, pgTable, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import type { findAthlete } from '../queries/athletes';

import { $t } from '../../../shared/utils/i18n';
import {
    AddressSchema,
    BirthplaceSchema,
    EmailSchema,
    FiscalCodeSchema,
    NameSchema,
    PhoneNumberSchema,
} from '../../utils/zod-schemas';
import { enrollment } from './enrollment';
import { parent } from './parent';

export const athlete = pgTable('athlete', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    birthdate: date().notNull(),
    birthplacePostalCode: text(),
    birthplaceCity: text(),
    birthplaceProvince: text(),
    birthplaceRegion: text(),
    birthplaceCountry: text().notNull(),
    birthplaceFormattedAddress: text().notNull(),
    birthplacePlaceId: text().notNull(),
    fiscalCode: char({ length: 16 }).notNull().unique(),
    addressStreet: text().notNull(),
    addressPostalCode: text().notNull(),
    addressCity: text().notNull(),
    addressProvince: text().notNull(),
    addressRegion: text().notNull(),
    addressCountry: text().notNull(),
    addressFormattedAddress: text().notNull(),
    addressPlaceId: text().notNull(),
    phoneNumber: varchar({ length: 15 }),
    email: varchar({ length: 255 }),
    parentId: integer().references(() => parent.id, { onDelete: 'set null' }),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    uniqueIndex().on(table.phoneNumber).where(sql`${table.phoneNumber} IS NOT NULL`),
    uniqueIndex().on(table.email).where(sql`${table.email} IS NOT NULL`),
    index().on(table.parentId),
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
    name: NameSchema,
    birthdate: z.string($t('form.field.birthdate.required'))
        .refine((value) => new Date(value) <= new Date(), $t('form.field.birthdate.error')),
    fiscalCode: FiscalCodeSchema,
    phoneNumber: PhoneNumberSchema,
    email: EmailSchema,
    parentId: z.union([z.literal('').transform(() => undefined), z.coerce.number()]).optional(),
}).extend({
    birthplace: BirthplaceSchema,
    address: AddressSchema,
}).omit({
    birthplacePostalCode: true,
    birthplaceCity: true,
    birthplaceProvince: true,
    birthplaceRegion: true,
    birthplaceCountry: true,
    birthplaceFormattedAddress: true,
    birthplacePlaceId: true,
    addressStreet: true,
    addressPostalCode: true,
    addressCity: true,
    addressProvince: true,
    addressRegion: true,
    addressCountry: true,
    addressFormattedAddress: true,
    addressPlaceId: true,
    createdAt: true,
    updatedAt: true,
});

export type InsertAthlete = z.infer<typeof InsertAthlete>;
export type SelectAthlete = SerializeObject<typeof athlete.$inferSelect>;
export type SelectAthleteWithRelations = SerializeObject<NonNullable<Awaited<ReturnType<typeof findAthlete>>>>;
