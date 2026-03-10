import type { InputDateProps, InputProps, SelectMenuProps, SelectProps } from '@nuxt/ui';

export type FormFieldModelType = string | number | undefined;

type InputField = InputProps & {
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
} & (InputField | FormInputDateField | FormSelectField | FormSelectMenuField);

export type GroupFormField<T> = {
    title: string;
    icon: string;
    fields: FormField<T>[];
};
