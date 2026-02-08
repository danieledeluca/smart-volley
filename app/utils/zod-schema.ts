import z from 'zod';

export const userSchema = z.object({
    email: z.email({
        error: (issue) => {
            return issue.input ? 'Invalid email' : 'Email is required';
        },
    }),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
});

export type UserSchema = z.infer<typeof userSchema>;
