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

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type AthletesFiltersSchema = z.infer<typeof athletesFiltersSchema>;
export type EnrollmentsFiltersSchema = z.infer<typeof enrollmentsFiltersSchema>;
