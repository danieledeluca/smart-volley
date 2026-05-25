import type {
    ButtonProps,
    CalendarProps,
    FileUploadProps,
    FormFieldProps,
    InputDateProps,
    InputNumberProps,
    InputProps,
    SelectMenuProps,
    SelectProps,
} from '@nuxt/ui';

type InputField = {
    renderAs: 'input';
    inputProps?: Omit<InputProps, 'modelValue' | 'defaultValue'>;
};

type InputNumberField = {
    renderAs: 'input-number';
    inputProps?: InputNumberProps;
};

type InputDateField = {
    renderAs: 'input-date';
    inputProps?: InputDateProps;
    calendarProps?: CalendarProps;
};

type InputFileField = {
    renderAs: 'input-file';
    fileUploadProps?: Omit<FileUploadProps, 'label' | 'icon'>;
    buttonProps?: Omit<ButtonProps, 'label' | 'icon'>;
};

type SelectField = {
    renderAs: 'select';
    selectProps?: SelectProps;
};

type SelectMenuField = {
    renderAs: 'select-menu';
    selectProps?: Omit<SelectMenuProps, 'valueKey'>;
};

export type FormField<T> = {
    renderAs: string;
    debounce?: boolean;
    formFieldProps: Omit<FormFieldProps, 'name'> & { name: string & keyof T };
} & (InputField | InputNumberField | InputDateField | InputFileField | SelectField | SelectMenuField);

export type FormFieldGroup<T> = {
    title: string;
    icon: string;
    fields: FormField<T>[];
};
