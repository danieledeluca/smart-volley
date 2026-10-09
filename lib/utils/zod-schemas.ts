import z from 'zod';

import { $t } from '../../shared/utils/i18n';

const FISCAL_CODE_REGEX = /^[A-Z]{6}\d{2}[A-EHLMPRST](?:0[1-9]|[12]\d|3[01]|4[1-9]|5\d|6\d|7[01])[A-Z]\d{3}[A-Z]$/;
const PHONE_NUMBER_REGEX = /^\+?\d{7,15}$/;

export const NameSchema = z.string($t('form.field.name.required')).trim().nonempty($t('form.field.name.required'));
export const FiscalCodeSchema = z.string($t('form.field.fiscal_code.required'))
    .transform((value) => value.toUpperCase())
    .pipe(z.string().regex(FISCAL_CODE_REGEX, $t('form.field.fiscal_code.error')));
export const PhoneNumberSchema = z.string()
    .trim()
    .transform((value) => value || undefined)
    .refine((value) => !value || PHONE_NUMBER_REGEX.test(value), $t('form.field.phone_number.error'))
    .optional();
export const EmailSchema = z.string()
    .trim()
    .transform((value) => value || undefined)
    .refine((value) => !value || z.email().safeParse(value).success, $t('form.field.email.error'))
    .optional();
