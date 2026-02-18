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

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
