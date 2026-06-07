import type { SerializeObject } from 'nitropack';

import { relations } from 'drizzle-orm';
import { date, integer, numeric, pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import type { findEnrollment, findEnrollments } from '../queries/enrollments';

import { $t } from '../../../shared/utils/i18n';
import { FILE_ACCEPTED_TYPES, FILE_MAX_SIZE } from '../../utils/constants';
import { formatFileSize } from '../../utils/formatters';
import { athlete } from './athlete';
import { course } from './course';
import { season } from './season';

export const enrollment = pgTable('enrollment', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    athleteId: integer().notNull().references(() => athlete.id),
    seasonId: integer().notNull().references(() => season.id),
    courseId: integer().notNull().references(() => course.id),
    volleyAccount: numeric({ precision: 10, scale: 2 }),
    volleyBalance: numeric({ precision: 10, scale: 2 }),
    volleyBalanceSecondary: numeric({ precision: 10, scale: 2 }),
    firstInstallment: numeric({ precision: 10, scale: 2 }),
    secondInstallment: numeric({ precision: 10, scale: 2 }),
    thirdInstallment: numeric({ precision: 10, scale: 2 }),
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

const NumericSchema = z.string().transform((value) => !Number(value) ? undefined : value).optional();

export const InsertEnrollment = createInsertSchema(enrollment, {
    athleteId: z.coerce.number($t('form.field.athlete_id.required')),
    seasonId: z.coerce.number($t('form.field.season_id.required')),
    courseId: z.coerce.number($t('form.field.course_id.required')),
    volleyAccount: NumericSchema,
    volleyBalance: NumericSchema,
    volleyBalanceSecondary: NumericSchema,
    firstInstallment: NumericSchema,
    secondInstallment: NumericSchema,
    thirdInstallment: NumericSchema,
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
    const hasCertificateExpirationDate = Boolean(data.certificateExpirationDate);
    const hasCertificateStorageKey = Boolean(data.certificateStorageKey);

    if (hasCertificateExpirationDate && !hasCertificateStorageKey) {
        ctx.addIssue({
            code: 'custom',
            path: ['certificateStorageKey'],
            message: $t('form.field.certificate_storage_key.required'),
        });
    }

    if (hasCertificateStorageKey && !hasCertificateExpirationDate) {
        ctx.addIssue({
            code: 'custom',
            path: ['certificateExpirationDate'],
            message: $t('form.field.certificate_expiration_date.required'),
        });
    }
});

export type InsertEnrollment = z.infer<typeof InsertEnrollment>;
export type SelectEnrollmentsWithRelations = SerializeObject<Awaited<ReturnType<typeof findEnrollments>>[number]>;
export type SelectEnrollmentWithRelations = SerializeObject<NonNullable<Awaited<ReturnType<typeof findEnrollment>>>>;
