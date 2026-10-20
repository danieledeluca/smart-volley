import z from 'zod';

// Field schemas
const CertificateStatusSchema = z.enum(['valid', 'expired', 'missing']);

// Form schemas
export const EnrollmentsFiltersSchema = z.object({
    seasonId: z.coerce.number().optional(),
    activityId: z.coerce.number().optional(),
    courseId: z.coerce.number().optional(),
    certificateStatus: z.preprocess(
        (value) => typeof value === 'string' ? value.split(',') : value,
        z.array(CertificateStatusSchema).optional(),
    ),
});

// Schema types
export type CertificateStatus = z.infer<typeof CertificateStatusSchema>;

export type EnrollmentsFilters = z.infer<typeof EnrollmentsFiltersSchema>;
