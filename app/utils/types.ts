import type { InputDateProps, InputNumberProps, InputProps, SelectMenuProps, SelectProps } from '@nuxt/ui';

export type FormFieldModelType = string | number | undefined;

type InputField = InputProps & {
    renderAs: 'input';
};

type InputNumberField = InputNumberProps & {
    renderAs: 'input-number';
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
} & (InputField | InputNumberField | FormInputDateField | FormSelectField | FormSelectMenuField);

export type GroupFormField<T> = {
    title: string;
    icon: string;
    fields: FormField<T>[];
};

export type FormAddInstance = {
    submit: () => Promise<void> | undefined;
} | null;
