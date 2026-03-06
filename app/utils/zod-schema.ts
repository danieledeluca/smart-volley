import type { AthleteUncheckedCreateInput } from '~~/prisma/generated/prisma/models';

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

const filtersNameSchema = z.string().optional();
const filtersSeasonSchema = z.number().optional();
const filtersActivitySchema = z.number().optional();
const filtersCourseSchema = z.number().optional();

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
    name: filtersNameSchema,
});

export const enrollmentsFiltersSchema = z.object({
    name: filtersNameSchema,
    season: filtersSeasonSchema,
    activity: filtersActivitySchema,
    course: filtersCourseSchema,
});

export const addAthleteSchema: z.ZodType<AthleteUncheckedCreateInput> = z.object({
    name: z.string('Name is required').nonempty('Name is required').transform((name) => name.toUpperCase()),
    birthday: z.coerce.date('Birthday is required').max(new Date(), 'Birthday must be in the past'),
    birthplace: z.string('Birthplace is required').nonempty('Birthplace is required'),
    tax_code: z.string('Tax Code is required')
        .regex(/^[A-Z]{6}\d{2}[A-EHLMPR-T](\d{2})[A-Z]\d{3}[A-Z]$/, 'Invalid Fiscal Code format'),
    city: z.string('City is required').nonempty('City is required'),
    address: z.string('Address is required').nonempty('Address is required'),
    phone_number: z.string('Phone number is required').nonempty('Phone number is required'),
    email: z.string().optional(),
    parent_id: z.number().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type AthletesFiltersSchema = z.infer<typeof athletesFiltersSchema>;
export type EnrollmentsFiltersSchema = z.infer<typeof enrollmentsFiltersSchema>;

export type AddAthleteSchema = z.infer<typeof addAthleteSchema>;
