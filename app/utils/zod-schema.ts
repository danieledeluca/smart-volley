import type { core } from 'zod';

import z from 'zod';

// Constants
export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MIN_LENGTH = 3;

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

const seasonSchema = z.number($t('form.season.required'));
const activitySchema = z.number($t('form.activity.required'));
const nameSchema = z.string($t('form.name.required'))
    .min(NAME_MIN_LENGTH, $t('form.name.error', { min: NAME_MIN_LENGTH }));

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

export const athleteFiltersWithoutNameSchema = z.object({
    mode: z.literal('withoutName'),
    season: seasonSchema,
    activity: activitySchema,
});

export const athleteFiltersWithNameSchema = z.object({
    mode: z.literal('withName'),
    name: nameSchema,
    season: seasonSchema.optional(),
    activity: activitySchema.optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type AthleteFiltersWithoutNameSchema = z.infer<typeof athleteFiltersWithoutNameSchema>;
export type AthleteFiltersWithNameSchema = z.infer<typeof athleteFiltersWithNameSchema>;
export type AthleteFiltersSchema = AthleteFiltersWithoutNameSchema | AthleteFiltersWithNameSchema;
