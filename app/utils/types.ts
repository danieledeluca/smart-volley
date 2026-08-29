import type {
    BadgeProps,
    ButtonProps,
    CalendarProps,
    CheckboxGroupProps,
    FileUploadProps,
    FormFieldProps,
    InputDateProps,
    InputNumberProps,
    InputProps,
    RadioGroupProps,
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

type InputAddressAutocomplete = {
    renderAs: 'input-address';
    inputProps?: Omit<InputProps, 'modelValue' | 'defaultValue'>;
    autocompleteOptions?: google.maps.places.AutocompleteOptions;
};

type CheckboxGroupField = {
    renderAs: 'checkbox-group';
    singleSelection?: boolean;
    checkboxGroupProps?: CheckboxGroupProps;
};

type RadioGroupField = {
    renderAs: 'radio-group';
    radioGroupProps?: RadioGroupProps;
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
    formFieldProps: Omit<FormFieldProps, 'name'> & { name: string & keyof T };
} & (InputField
    | InputNumberField
    | InputDateField
    | InputFileField
    | InputAddressAutocomplete
    | CheckboxGroupField
    | RadioGroupField
    | SelectField
    | SelectMenuField);

export type FormFieldGroup<T> = {
    title?: string;
    icon?: string;
    fields: FormField<T>[];
};

export type DashboardCard = {
    icon: string;
    iconColor?: ButtonProps['color'];
    title: string;
    description: string;
    badgeLabel?: string;
    badgeColor?: BadgeProps['color'];
};

export type ParsedAddress = {
    street?: string;
    postalCode?: string;
    city?: string;
    province?: string;
    region?: string;
    country: string;
    formattedAddress: string;
    placeId: string;
};
