import z from 'zod';

export const loginSchema = z.object({
    email: z.email({
        error: (issue) => {
            return issue.input ? 'Invalid email' : 'Email is required';
        },
    }),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
});

export const registerSchema = z.object({
    email: z.email({
        error: (issue) => {
            return issue.input ? 'Invalid email' : 'Email is required';
        },
    }),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
    confirmPassword: z.string('Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
