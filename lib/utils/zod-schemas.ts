import z from 'zod';

import { $t } from '../../shared/utils/i18n';

// Constants
const FISCAL_CODE_REGEX = /^[A-Z]{6}\d{2}[A-EHLMPRST](?:0[1-9]|[12]\d|3[01]|4[1-9]|5\d|6\d|7[01])[A-Z]\d{3}[A-Z]$/;
const PHONE_NUMBER_REGEX = /^\+?\d{7,15}$/;

// Generic schemas
const OptionalStringSchema = z.string().trim().transform((value) => value || undefined).optional();

// Field schemas
export const NameSchema = z.string($t('form.field.name.required')).trim().nonempty($t('form.field.name.required'));
export const FiscalCodeSchema = z.string($t('form.field.fiscal_code.required'))
    .trim()
    .transform((value) => value.toUpperCase())
    .pipe(z.string().regex(FISCAL_CODE_REGEX, $t('form.field.fiscal_code.error')));
export const PhoneNumberSchema = OptionalStringSchema
    .refine((value) => !value || PHONE_NUMBER_REGEX.test(value), $t('form.field.phone_number.error'));
export const EmailSchema = OptionalStringSchema
    .refine((value) => !value || z.email().safeParse(value).success, $t('form.field.email.error'));

// Composite schemas
export const BirthplaceSchema = z.object({
    postalCode: OptionalStringSchema,
    city: OptionalStringSchema,
    province: OptionalStringSchema,
    region: OptionalStringSchema,
    country: OptionalStringSchema,
    formattedAddress: OptionalStringSchema,
    placeId: OptionalStringSchema,
}, $t('form.field.birthplace.required')).superRefine((data, ctx) => {
    if (!data.country || !data.formattedAddress || !data.placeId) {
        ctx.addIssue({
            code: 'custom',
            path: [],
            message: $t('form.field.birthplace.valid'),
        });
    }
}).pipe(
    z.object({
        postalCode: z.string().optional(),
        city: z.string().optional(),
        province: z.string().optional(),
        region: z.string().optional(),
        country: z.string(),
        formattedAddress: z.string(),
        placeId: z.string(),
    }),
);
export const AddressSchema = z.object({
    street: OptionalStringSchema,
    postalCode: OptionalStringSchema,
    city: OptionalStringSchema,
    province: OptionalStringSchema,
    region: OptionalStringSchema,
    country: OptionalStringSchema,
    formattedAddress: OptionalStringSchema,
    placeId: OptionalStringSchema,
}, $t('form.field.address.required')).superRefine((data, ctx) => {
    const isComplete = Object.values(data).every((value) => Boolean(value));

    if (!isComplete) {
        ctx.addIssue({
            code: 'custom',
            path: [],
            message: $t('form.field.address.valid'),
        });
    }
}).pipe(
    z.object({
        street: z.string(),
        postalCode: z.string(),
        city: z.string(),
        province: z.string(),
        region: z.string(),
        country: z.string(),
        formattedAddress: z.string(),
        placeId: z.string(),
    }),
);
