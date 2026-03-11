import type { AthleteUncheckedCreateInput, ParentUncheckedCreateInput } from '~~/prisma/generated/prisma/models';

import z from 'zod';

// Fields schema
const emailSchema = z.email({
    error: (issue) => issue.input ? $t('form.field.email.error') : $t('form.field.email.required'),
});
const passwordSchema = z.string($t('form.field.password.required'))
    .min(PASSWORD_MIN_LENGTH, {
        error: (issue) => issue.input
            ? $t('form.field.password.error', { min: PASSWORD_MIN_LENGTH.toString() })
            : $t('form.field.password.required'),
    });
const confirmPasswordSchema = z.string($t('form.field.confirm_password.required'));
const passwordMatch: z.core.$ZodCustomParams = {
    message: $t('form.field.confirm_password.error'),
    path: ['confirmPassword'],
};

const nameSchema = z.string($t('form.field.name.required')).nonempty($t('form.field.name.required'));
const taxCodeSchema = z.string($t('form.field.tax_code.required'))
    .regex(/^[A-Z]{6}\d{2}[A-EHLMPR-T](\d{2})[A-Z]\d{3}[A-Z]$/, $t('form.field.tax_code.error'));
const phoneNumberSchema = z.string($t('form.field.phone_number.required'))
    .nonempty($t('form.field.phone_number.required'));

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
    birthday: z.coerce.date($t('form.field.birthday.required')).max(new Date(), $t('form.field.birthday.error')),
    birthplace: z.string($t('form.field.birthplace.required')).nonempty($t('form.field.birthplace.required')),
    tax_code: taxCodeSchema,
    city: z.string($t('form.field.city.required')).nonempty($t('form.field.city.required')),
    address: z.string($t('form.field.address.required')).nonempty($t('form.field.address.required')),
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
