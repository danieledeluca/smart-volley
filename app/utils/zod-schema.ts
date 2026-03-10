import type { AthleteUncheckedCreateInput, ParentUncheckedCreateInput } from '~~/prisma/generated/prisma/models';

import z from 'zod';

// Constants
export const PASSWORD_MIN_LENGTH = 8;

// Fields schema
const emailSchema = z.email({
    error: (issue) => issue.input ? $t('form.email.error') : $t('form.email.required'),
});
const passwordSchema = z.string($t('form.password.required'))
    .min(PASSWORD_MIN_LENGTH, {
        error: (issue) => issue.input
            ? $t('form.password.error', { min: PASSWORD_MIN_LENGTH.toString() })
            : $t('form.password.required'),
    });
const confirmPasswordSchema = z.string($t('form.confirm_password.required'));
const passwordMatch: z.core.$ZodCustomParams = {
    message: $t('form.confirm_password.error'),
    path: ['confirmPassword'],
};

const nameSchema = z.string('Name is required').nonempty('Name is required');
const taxCodeSchema = z.string('Tax Code is required')
    .regex(/^[A-Z]{6}\d{2}[A-EHLMPR-T](\d{2})[A-Z]\d{3}[A-Z]$/, 'Invalid Fiscal Code format');
const phoneNumberSchema = z.string('Phone number is required').nonempty('Phone number is required');

// Forms schema
export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export const registerSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
}).refine((data) => data.password === data.confirmPassword, passwordMatch);

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export const resetPasswordSchema = z.object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
}).refine((data) => data.password === data.confirmPassword, passwordMatch);

export const athletesFiltersSchema = z.object({
    name: z.string().optional(),
});

export const enrollmentsFiltersSchema = z.object({
    name: z.string().optional(),
    season: z.number().optional(),
    activity: z.number().optional(),
    course: z.number().optional(),
    payment: z.string().optional(),
    certificateStatus: z.string().optional(),
});

export const athleteAddSchema: z.ZodType<AthleteUncheckedCreateInput> = z.object({
    name: nameSchema,
    birthday: z.coerce.date('Birthday is required').max(new Date(), 'Birthday must be in the past'),
    birthplace: z.string('Birthplace is required').nonempty('Birthplace is required'),
    tax_code: taxCodeSchema,
    city: z.string('City is required').nonempty('City is required'),
    address: z.string('Address is required').nonempty('Address is required'),
    phone_number: phoneNumberSchema,
    email: z.string().optional(),
    parent_id: z.number().optional(),
});

export const parentAddSchema: z.ZodType<ParentUncheckedCreateInput> = z.object({
    name: nameSchema,
    tax_code: taxCodeSchema,
    phone_number: phoneNumberSchema,
    email: z.string().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type AthletesFiltersSchema = z.infer<typeof athletesFiltersSchema>;
export type EnrollmentsFiltersSchema = z.infer<typeof enrollmentsFiltersSchema>;

export type AthleteAddSchema = z.infer<typeof athleteAddSchema>;
export type ParentAddSchema = z.infer<typeof parentAddSchema>;
