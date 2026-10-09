import type { SerializeObject } from 'nitropack';
import type z from 'zod';

import { EmailSchema, FiscalCodeSchema, NameSchema, PhoneNumberSchema } from '~~/lib/utils/zod-schemas';
import { relations, sql } from 'drizzle-orm';
import { char, integer, pgTable, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

import type { findParent, findParents, insertParent, updateParent } from '../queries/parents';

import { athlete } from './athlete';

export const parent = pgTable('parent', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    fiscalCode: char({ length: 16 }).notNull().unique(),
    phoneNumber: varchar({ length: 15 }),
    email: varchar({ length: 255 }),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    uniqueIndex().on(table.phoneNumber).where(sql`${table.phoneNumber} IS NOT NULL`),
    uniqueIndex().on(table.email).where(sql`${table.email} IS NOT NULL`),
]);

export const parentRelations = relations(parent, ({ many }) => {
    return {
        athletes: many(athlete),
    };
});

export const InsertParent = createInsertSchema(parent, {
    name: NameSchema,
    fiscalCode: FiscalCodeSchema,
    phoneNumber: PhoneNumberSchema,
    email: EmailSchema,
}).omit({
    createdAt: true,
    updatedAt: true,
});

export type InsertParent = z.infer<typeof InsertParent>;
export type InsertedParent = Awaited<ReturnType<typeof insertParent>>;
export type SelectParents = SerializeObject<Awaited<ReturnType<typeof findParents>>[number]>;
export type SelectParentWithRelations = SerializeObject<NonNullable<Awaited<ReturnType<typeof findParent>>>>;
export type UpdatedParent = Awaited<ReturnType<typeof updateParent>>;
