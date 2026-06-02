import z from 'zod';

// Fields schema
export const MissingPaymentEnum = z.enum([
    'volleyAccount',
    'volleyBalance',
    'volleyBalanceSecondary',
    'firstInstallment',
    'secondInstallment',
    'thirdInstallment',
]);

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
    missingPayment: MissingPaymentEnum.optional(),
    certificateStatus: CertificateStatusEnum.optional(),
});

// Schema types
export type MissingPaymentEnum = z.infer<typeof MissingPaymentEnum>;
export type CertificateStatusEnum = z.infer<typeof CertificateStatusEnum>;

export type AthletesFiltersSchema = z.infer<typeof AthletesFiltersSchema>;
export type ParentsFiltersSchema = z.infer<typeof ParentsFiltersSchema>;
export type EnrollmentsFiltersSchema = z.infer<typeof EnrollmentsFiltersSchema>;
