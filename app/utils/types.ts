import type { AlertProps, InputProps, SelectProps } from '@nuxt/ui';

export type Message = {
    title: string;
    color: AlertProps['color'];
    icon: string;
};

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
