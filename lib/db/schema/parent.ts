import { relations, sql } from 'drizzle-orm';
import { char, integer, pgTable, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import { FISCAL_CODE_REGEX, PHONE_NUMBER_REGEX } from '../../../shared/utils/constants';
import { $t } from '../../../shared/utils/i18n';
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

export const parentRelations = relations(parent, ({ many }) => ({
    athletes: many(athlete),
}));

export const InsertParent = createInsertSchema(parent, {
    name: z.string($t('form.field.name.required')).trim().nonempty($t('form.field.name.required')),
    fiscalCode: z.string($t('form.field.fiscal_code.required'))
        .transform((value) => value.toUpperCase())
        .pipe(z.string().regex(FISCAL_CODE_REGEX, $t('form.field.fiscal_code.error'))),
    phoneNumber: z.string()
        .refine((value) => !value || PHONE_NUMBER_REGEX.test(value), $t('form.field.phone_number.error'))
        .optional(),
    email: z.string()
        .refine((value) => !value || z.email().safeParse(value).success, $t('form.field.email.error'))
        .optional(),
}).omit({
    createdAt: true,
    updatedAt: true,
});

export type InsertParent = z.infer<typeof InsertParent>;
