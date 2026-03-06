import type { InputDateProps, InputProps, SelectMenuProps, SelectProps } from '@nuxt/ui';

export type CertificateDateStatus = 'valid' | 'expired' | 'missing';

export type FormFieldModelType = string | number | undefined;

type nputField = InputProps & {
    renderAs: 'input';
};

type FormInputDateField = InputDateProps & {
    renderAs: 'input-date';
};

type FormSelectField = SelectProps & {
    renderAs: 'select';
};

type FormSelectMenuField = SelectMenuProps & {
    renderAs: 'select-menu';
};

export type FormField<T> = {
    label: string;
    name: keyof T;
    debounce?: boolean;
} & (nputField | FormInputDateField | FormSelectField | FormSelectMenuField);
