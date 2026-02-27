import type { core } from 'zod';

import z from 'zod';

// Constants
export const PASSWORD_MIN_LENGTH = 8;

// Fields schema
const emailSchema = z.email({
    error: (issue) => issue.input ? $t('form.email.error') : $t('form.email.required'),
});
const passwordSchema = z.string($t('form.password.required'))
    .min(PASSWORD_MIN_LENGTH, $t('form.password.error', { min: PASSWORD_MIN_LENGTH }));
const confirmPasswordSchema = z.string($t('form.confirm_password.required'));
const passwordMatch: core.$ZodCustomParams = {
    message: 'form.confirm_password.error',
    path: ['confirmPassword'],
};

const nameSchema = z.string().optional();
const seasonSchema = z.number().optional();
const activitySchema = z.number().optional();
const courseSchema = z.number().optional();

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
    name: nameSchema,
});

export const enrollmentsFiltersSchema = z.object({
    name: nameSchema,
    season: seasonSchema,
    activity: activitySchema,
    course: courseSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type AthletesFiltersSchema = z.infer<typeof athletesFiltersSchema>;
export type EnrollmentsFiltersSchema = z.infer<typeof enrollmentsFiltersSchema>;
