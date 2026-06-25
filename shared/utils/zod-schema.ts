import { ENROLLMENT_PAYMENT_FIELDS } from '~~/lib/db/schema';
import z from 'zod';

// Fields schema
export const CertificateStatusEnum = z.enum(['valid', 'expired', 'missing']);

// Forms schema
export const AthletesFiltersSchema = z.object({
    name: z.string().optional(),
});

export const ParentsFiltersSchema = z.object({
    name: z.string().optional(),
});

export const EnrollmentsFiltersSchema = z.object({
    athleteName: z.string().optional(),
    seasonId: z.coerce.number().optional(),
    activityId: z.coerce.number().optional(),
    courseId: z.coerce.number().optional(),
    missingPayment: z.enum(ENROLLMENT_PAYMENT_FIELDS).optional(),
    certificateStatus: z.union([CertificateStatusEnum, z.array(CertificateStatusEnum)])
        .transform((value) => Array.isArray(value) ? value : [value])
        .optional(),
});

export const MultipleDeleteSchema = z.object({
    ids: z.array(z.number()),
});

// Schema types
export type CertificateStatusEnum = z.infer<typeof CertificateStatusEnum>;

export type AthletesFiltersSchema = z.infer<typeof AthletesFiltersSchema>;
export type ParentsFiltersSchema = z.infer<typeof ParentsFiltersSchema>;
export type EnrollmentsFiltersSchema = z.infer<typeof EnrollmentsFiltersSchema>;

export type MultipleDeleteSchema = z.infer<typeof MultipleDeleteSchema>;
