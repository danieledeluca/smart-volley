import { ENROLLMENT_PAYMENT_FIELDS } from '~~/lib/utils/constants';
import z from 'zod';

// Fields schema
export const CertificateStatusEnum = z.enum(['valid', 'expired', 'missing']);

// Forms schema
export const EnrollmentsFiltersSchema = z.object({
    seasonId: z.coerce.number().optional(),
    activityId: z.coerce.number().optional(),
    courseId: z.coerce.number().optional(),
    missingPayment: z.enum(ENROLLMENT_PAYMENT_FIELDS).optional(),
    certificateStatus: z.preprocess(
        (value) => typeof value === 'string' ? value.split(',') : value,
        z.array(CertificateStatusEnum).optional(),
    ),
});

export const MultipleDeleteSchema = z.object({
    ids: z.array(z.number()),
});

// Schema types
export type CertificateStatusEnum = z.infer<typeof CertificateStatusEnum>;

export type EnrollmentsFiltersSchema = z.infer<typeof EnrollmentsFiltersSchema>;

export type MultipleDeleteSchema = z.infer<typeof MultipleDeleteSchema>;
