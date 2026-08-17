import type { SerializeObject } from 'nitropack';

import { relations } from 'drizzle-orm';
import { date, integer, numeric, pgEnum, pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import type { findEnrollment, findEnrollments, updateEnrollment } from '../queries/enrollments';

import { camelToSnakeCase } from '../../../app/utils/formatters';
import { $t } from '../../../shared/utils/i18n';
import { ENROLLMENT_PAYMENT_FIELDS, FILE_ACCEPTED_TYPES, FILE_MAX_SIZE } from '../../utils/constants';
import { formatFileSize } from '../../utils/formatters';
import { athlete } from './athlete';
import { course } from './course';
import { season } from './season';

export const enrollmentPaymentType = pgEnum('enrollment_payment_type', ['cash', 'bank_transfer']);

export const enrollment = pgTable('enrollment', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    athleteId: integer().notNull().references(() => athlete.id),
    seasonId: integer().notNull().references(() => season.id),
    courseId: integer().notNull().references(() => course.id),
    volleyAccount: numeric({ precision: 10, scale: 2 }),
    volleyAccountDate: date(),
    volleyAccountType: enrollmentPaymentType(),
    volleyBalance: numeric({ precision: 10, scale: 2 }),
    volleyBalanceDate: date(),
    volleyBalanceType: enrollmentPaymentType(),
    volleySecondBalance: numeric({ precision: 10, scale: 2 }),
    volleySecondBalanceDate: date(),
    volleySecondBalanceType: enrollmentPaymentType(),
    gymnasticsFirstInstallment: numeric({ precision: 10, scale: 2 }),
    gymnasticsFirstInstallmentDate: date(),
    gymnasticsFirstInstallmentType: enrollmentPaymentType(),
    gymnasticsSecondInstallment: numeric({ precision: 10, scale: 2 }),
    gymnasticsSecondInstallmentDate: date(),
    gymnasticsSecondInstallmentType: enrollmentPaymentType(),
    gymnasticsThirdInstallment: numeric({ precision: 10, scale: 2 }),
    gymnasticsThirdInstallmentDate: date(),
    gymnasticsThirdInstallmentType: enrollmentPaymentType(),
    certificateExpirationDate: date(),
    certificateStorageKey: text(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
    deletedAt: timestamp(),
}, (table) => [
    unique().on(table.athleteId, table.seasonId, table.courseId),
]);

export const enrollmentRelations = relations(enrollment, ({ one }) => {
    return {
        athlete: one(athlete, {
            fields: [enrollment.athleteId],
            references: [athlete.id],
        }),
        season: one(season, {
            fields: [enrollment.seasonId],
            references: [season.id],
        }),
        course: one(course, {
            fields: [enrollment.courseId],
            references: [course.id],
        }),
    };
});

const PaymentAmountSchema = z.string().transform((value) => !Number(value) ? undefined : value).optional();
const PaymentDateSchema = z.string().optional();
const PaymentTypeSchema = z.enum(enrollmentPaymentType.enumValues).optional();

export const InsertEnrollment = createInsertSchema(enrollment, {
    athleteId: z.coerce.number($t('form.field.athlete_id.required')),
    seasonId: z.coerce.number($t('form.field.season_id.required')),
    courseId: z.coerce.number($t('form.field.course_id.required')),
    volleyAccount: PaymentAmountSchema,
    volleyAccountDate: PaymentDateSchema,
    volleyAccountType: PaymentTypeSchema,
    volleyBalance: PaymentAmountSchema,
    volleyBalanceDate: PaymentDateSchema,
    volleyBalanceType: PaymentTypeSchema,
    volleySecondBalance: PaymentAmountSchema,
    volleySecondBalanceDate: PaymentDateSchema,
    volleySecondBalanceType: PaymentTypeSchema,
    gymnasticsFirstInstallment: PaymentAmountSchema,
    gymnasticsFirstInstallmentDate: PaymentDateSchema,
    gymnasticsFirstInstallmentType: PaymentTypeSchema,
    gymnasticsSecondInstallment: PaymentAmountSchema,
    gymnasticsSecondInstallmentDate: PaymentDateSchema,
    gymnasticsSecondInstallmentType: PaymentTypeSchema,
    gymnasticsThirdInstallment: PaymentAmountSchema,
    gymnasticsThirdInstallmentDate: PaymentDateSchema,
    gymnasticsThirdInstallmentType: PaymentTypeSchema,
    certificateExpirationDate: z.string().optional(),
    certificateStorageKey: z.instanceof(File)
        .refine((file) => file.size <= FILE_MAX_SIZE, {
            message: $t('form.field.certificate_storage_key.error.size', { size: formatFileSize(FILE_MAX_SIZE) }),
        })
        .refine((file) => FILE_ACCEPTED_TYPES.includes(file.type), {
            message: $t('form.field.certificate_storage_key.error.type'),
        })
        .nullish(),
}).omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
}).superRefine((data, ctx) => {
    ENROLLMENT_PAYMENT_FIELDS.forEach((baseField) => {
        const fields = [baseField, `${baseField}Type`] as const;

        const hasMissing = fields.some((field) => !data[field]);
        const hasAtLeastOne = fields.some((field) => data[field]);

        if (!hasMissing || !hasAtLeastOne) {
            return;
        }

        fields.forEach((field) => {
            if (!data[field]) {
                ctx.addIssue({
                    code: 'custom',
                    path: [field],
                    message: field.endsWith('Type')
                        ? $t('form.field.payment_type.required')
                        : $t(`form.field.${camelToSnakeCase(field)}.required`),
                });
            }
        });
    });
});

export type EnrollmentPaymentField = typeof ENROLLMENT_PAYMENT_FIELDS[number];
export type EnrollmentPaymentTypes = typeof enrollmentPaymentType.enumValues;

export type InsertEnrollment = z.infer<typeof InsertEnrollment>;
export type SelectEnrollmentsWithRelations = SerializeObject<Awaited<ReturnType<typeof findEnrollments>>[number]>;
export type SelectEnrollmentWithRelations = SerializeObject<NonNullable<Awaited<ReturnType<typeof findEnrollment>>>>;
export type UpdatedEnrollment = Awaited<ReturnType<typeof updateEnrollment>>;
