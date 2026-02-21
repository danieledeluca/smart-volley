import z from 'zod';

// Fields schema
const emailSchema = z.email({
    error: (issue) =>
        issue.input ? 'Invalid email' : 'Email is required',
});
const passwordSchema = z.string('Password is required').min(8, 'Must be at least 8 characters');
const confirmPasswordSchema = z.string('Confirm password is required');
const passwordMatch = {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
};

const seasonSchema = z.number('Season is required');
const activitySchema = z.number('Activity is required');
const nameSchema = z.string('Name is required').min(3, 'Must be at least 3 characters');

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
