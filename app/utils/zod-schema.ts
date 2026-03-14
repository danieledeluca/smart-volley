import type {
    ActivityUncheckedCreateInput,
    AthleteUncheckedCreateInput,
    CourseUncheckedCreateInput,
    EnrollmentUncheckedCreateInput,
    ParentUncheckedCreateInput,
    SeasonUncheckedCreateInput,
} from '~~/prisma/generated/prisma/models';

import z from 'zod';

// Fields schema
const emailRequiredSchema = z.email({
    error: (issue) => issue.input ? $t('form.field.email.error') : $t('form.field.email.required'),
});
const emailOptionalSchema = z.email({ error: (issue) => issue.input ? $t('form.field.email.error') : '' }).optional();
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
    email: emailRequiredSchema,
    password: passwordSchema,
});

export const registerSchema = z.object({
    email: emailRequiredSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
}).refine((data) => data.password === data.confirmPassword, passwordMatch);

export const forgotPasswordSchema = z.object({
    email: emailRequiredSchema,
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
    email: emailOptionalSchema,
    parent_id: z.number().optional(),
});

export const parentAddSchema: z.ZodType<ParentUncheckedCreateInput> = z.object({
    name: nameSchema,
    tax_code: taxCodeSchema,
    phone_number: phoneNumberSchema,
    email: emailOptionalSchema,
});

export const enrollmentAddSchema: z.ZodType<EnrollmentUncheckedCreateInput> = z.object({
    athlete_id: z.number($t('form.field.athlete.required')),
    season_id: z.number($t('form.field.season.required')),
    activity_id: z.number($t('form.field.activity.required')),
    course_id: z.number($t('form.field.course.required')),
    volley_account: z.number()
        .min(
            VOLLEY_ACCOUNT_MIN_VALUE,
            $t('form.field.volley_account.error', { min: VOLLEY_ACCOUNT_MIN_VALUE.toString() }),
        )
        .optional(),
    volley_balance: z.number()
        .min(
            VOLLEY_BALANCE_MIN_VALUE,
            $t('form.field.volley_balance.error', { min: VOLLEY_BALANCE_MIN_VALUE.toString() }),
        )
        .optional(),
    volley_balance_secondary: z.number()
        .min(
            VOLLEY_BALANCE_SECONDARY_MIN_VALUE,
            $t('form.field.volley_balance_secondary.error', { min: VOLLEY_BALANCE_SECONDARY_MIN_VALUE.toString() }),
        )
        .optional(),
    first_installment: z.number()
        .min(
            FIRST_INSTALLMENT_MIN_VALUE,
            $t('form.field.first_installment.error', { min: FIRST_INSTALLMENT_MIN_VALUE.toString() }),
        )
        .optional(),
    second_installment: z.number()
        .min(
            SECOND_INSTALLMENT_MIN_VALUE,
            $t('form.field.second_installment.error', { min: SECOND_INSTALLMENT_MIN_VALUE.toString() }),
        )
        .optional(),
    third_installment: z.number()
        .min(
            THIRD_INSTALLMENT_MIN_VALUE,
            $t('form.field.third_installment.error', { min: THIRD_INSTALLMENT_MIN_VALUE.toString() }),
        )
        .optional(),
    certificate_expiration_date: z.coerce.date().optional(),
});

export const seasonAddSchema: z.ZodType<SeasonUncheckedCreateInput> = z.object({
    starter_year: z.number($t('form.field.starter_year.required')),
    end_year: z.number($t('form.field.end_year.required')),
}).refine((data) => data.end_year === data.starter_year + 1, {
    message: $t('form.field.end_year.error'),
    path: ['end_year'],
});

export const activityAddSchema: z.ZodType<ActivityUncheckedCreateInput> = z.object({
    name: nameSchema,
});

export const courseAddSchema: z.ZodType<CourseUncheckedCreateInput> = z.object({
    name: nameSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type AthletesFiltersSchema = z.infer<typeof athletesFiltersSchema>;
export type EnrollmentsFiltersSchema = z.infer<typeof enrollmentsFiltersSchema>;

export type AthleteAddSchema = z.infer<typeof athleteAddSchema>;
export type ParentAddSchema = z.infer<typeof parentAddSchema>;
export type EnrollmentAddSchema = z.infer<typeof enrollmentAddSchema>;
export type SeasonAddSchema = z.infer<typeof seasonAddSchema>;
export type ActivityAddSchema = z.infer<typeof activityAddSchema>;
export type CourseAddSchema = z.infer<typeof courseAddSchema>;
