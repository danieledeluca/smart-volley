import type { InputProps, SelectProps } from '@nuxt/ui';

export type CertificateDateStatus = 'valid' | 'expired' | 'missing';

type FilterInputField = InputProps & {
    type: 'input';
};

type FilterSelectField = SelectProps & {
    type: 'select';
};

export type FilterField<T> = {
    label: string;
    name: keyof T;
} & (FilterInputField | FilterSelectField);
