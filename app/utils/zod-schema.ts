import z from 'zod';

// Fields schema
const EmailSchema = z.email({
    error: (issue) => issue.input ? $t('form.field.email.error') : $t('form.field.email.required'),
});
const PasswordSchema = z.string($t('form.field.password.required'))
    .min(PASSWORD_MIN_LENGTH, {
        error: (issue) => issue.input
            ? $t('form.field.password.error', { min: PASSWORD_MIN_LENGTH.toString() })
            : $t('form.field.password.required'),
    });
const ConfirmPasswordSchema = z.string($t('form.field.confirm_password.required'));
const passwordMatch: z.core.$ZodCustomParams = {
    message: $t('form.field.confirm_password.error'),
    path: ['confirmPassword'],
};

// Forms schema
export const RegisterSchema = z.object({
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
}).refine((data) => data.password === data.confirmPassword, passwordMatch);

export const LoginSchema = z.object({
    email: EmailSchema,
    password: PasswordSchema,
});

// Schema types
export type RegisterSchema = z.infer<typeof RegisterSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;
