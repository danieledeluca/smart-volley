import type { InputNumberProps, RadioGroupItem, RadioGroupProps } from '@nuxt/ui';
import type {
    InsertActivity,
    InsertAthlete,
    InsertCourse,
    InsertEnrollment,
    InsertParent,
    InsertSeason,
} from '~~/lib/db/schema';

import { CalendarDate } from '@internationalized/date';
import { enrollmentPaymentType } from '~~/lib/db/schema';
import { FILE_ACCEPTED_TYPES, FILE_MAX_SIZE } from '~~/lib/utils/constants';
import { formatFileSize } from '~~/lib/utils/formatters';

type FormSchemas = {
    athlete: InsertAthlete;
    parent: InsertParent;
    enrollment: InsertEnrollment;
    season: InsertSeason;
    activity: InsertActivity;
    course: InsertCourse;
};

export function useForm<K extends keyof FormSchemas>(formType: K, formAction?: FormAction) {
    const athletesStore = useAthletesStore();
    const parentsStore = useParentsStore();
    const seasonsStore = useSeasonsStore();
    const activitiesStore = useActivitiesStore();
    const coursesStore = useCoursesStore();

    const { athletesItems, athletesPending } = storeToRefs(athletesStore);
    const { parentsItems, parentsPending } = storeToRefs(parentsStore);
    const { seasonsItems, seasonsPending } = storeToRefs(seasonsStore);
    const { activitiesItems } = storeToRefs(activitiesStore);
    const { coursesItems, coursesPending } = storeToRefs(coursesStore);

    // Initial states
    const athleteInitialState: Partial<InsertAthlete> = {
        name: undefined,
        birthdate: undefined,
        birthplace: undefined,
        fiscalCode: undefined,
        address: undefined,
        phoneNumber: undefined,
        email: undefined,
        parentId: undefined,
    };

    const parentInitialState: Partial<InsertParent> = {
        name: undefined,
        fiscalCode: undefined,
        phoneNumber: undefined,
        email: undefined,
    };

    const enrollmentInitialState: Partial<InsertEnrollment> = {
        athleteId: undefined,
        seasonId: undefined,
        courseId: undefined,
        firstPayment: undefined,
        firstPaymentDate: undefined,
        firstPaymentType: undefined,
        secondPayment: undefined,
        secondPaymentDate: undefined,
        secondPaymentType: undefined,
        thirdPayment: undefined,
        thirdPaymentDate: undefined,
        thirdPaymentType: undefined,
        certificateExpirationDate: undefined,
        certificateStorageKey: undefined,
    };

    const seasonInitialState: Partial<InsertSeason> = {
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear() + 1,
    };

    const activityInitialState: Partial<InsertActivity> = {
        name: undefined,
    };

    const courseInitialState: Partial<InsertCourse> = {
        code: undefined,
        name: undefined,
        activityId: undefined,
    };

    const initialStates: { [K in keyof FormSchemas]: Partial<FormSchemas[K]> } = {
        athlete: athleteInitialState,
        parent: parentInitialState,
        enrollment: enrollmentInitialState,
        season: seasonInitialState,
        activity: activityInitialState,
        course: courseInitialState,
    };

    const initialState = initialStates[formType];

    // Form fields
    const currentDate = new Date();
    const maxDate = new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

    const paymentAmountInputProps: InputNumberProps = {
        step: 10,
        min: 10,
        formatOptions: {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'code',
            currencySign: 'accounting',
        },
    };

    const paymentTypeInputProps: RadioGroupProps = {
        items: enrollmentPaymentType.enumValues.map<RadioGroupItem>((type) => {
            return {
                label: $t(`form.field.payment_type.item.${type}`),
                value: type,
            };
        }),
        variant: 'table',
        orientation: 'horizontal',
        indicator: 'hidden',
        ui: {
            item: 'w-full',
        },
    };

    const athleteFields = computed<FormFieldGroup<InsertAthlete>[]>(() => {
        return [
            {
                title: $t('form.athlete.add.group.personal_information'),
                icon: 'i-lucide-id-card',
                fields: [
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.name.label'),
                            name: 'name',
                            required: true,
                        },
                        inputProps: {
                            placeholder: $t('form.field.name.placeholder'),
                        },
                    },
                    {
                        renderAs: 'input-date',
                        formFieldProps: {
                            label: $t('form.field.birthdate.label'),
                            name: 'birthdate',
                            required: true,
                        },
                        inputProps: {
                            maxValue: maxDate,
                        },
                        calendarProps: {
                            maxValue: maxDate,
                        },
                    },
                    {
                        renderAs: 'input-address',
                        formFieldProps: {
                            label: $t('form.field.birthplace.label'),
                            name: 'birthplace',
                            required: true,
                        },
                        inputProps: {
                            placeholder: $t('form.field.birthplace.placeholder'),
                        },
                        autocompleteOptions: {
                            types: ['(regions)'],
                        },
                    },
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.fiscal_code.label'),
                            name: 'fiscalCode',
                            required: true,
                        },
                        inputProps: {
                            placeholder: $t('form.field.fiscal_code.placeholder'),
                        },
                    },
                ],
            },
            {
                title: $t('form.athlete.add.group.address_contacts'),
                icon: 'i-lucide-notebook',
                fields: [
                    {
                        renderAs: 'input-address',
                        formFieldProps: {
                            label: $t('form.field.address.label'),
                            name: 'address',
                            required: true,
                        },
                        inputProps: {
                            placeholder: $t('form.field.address.placeholder'),
                        },
                        autocompleteOptions: {
                            types: ['address'],
                        },
                    },
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.phone_number.label'),
                            name: 'phoneNumber',
                        },
                        inputProps: {
                            placeholder: $t('form.field.phone_number.placeholder'),
                        },
                    },
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.email.label'),
                            name: 'email',
                        },
                        inputProps: {
                            placeholder: $t('form.field.email.placeholder'),
                        },
                    },
                ],
            },
            {
                title: $t('form.athlete.add.group.parent'),
                icon: 'i-lucide-user',
                fields: [
                    {
                        renderAs: 'select-menu',
                        formFieldProps: {
                            name: 'parentId',
                        },
                        selectProps: {
                            placeholder: $t('form.field.parent_id.placeholder'),
                            items: parentsItems.value,
                            loading: parentsPending.value,
                        },
                    },
                ],
            },
        ];
    });

    const parentFields = computed<FormFieldGroup<InsertParent>[]>(() => {
        return [
            {
                title: $t('form.parent.add.group.personal_information'),
                icon: 'i-lucide-user',
                fields: [
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.name.label'),
                            name: 'name',
                            required: true,
                        },
                        inputProps: {
                            placeholder: $t('form.field.name.placeholder'),
                        },
                    },
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.fiscal_code.label'),
                            name: 'fiscalCode',
                            required: true,
                        },
                        inputProps: {
                            placeholder: $t('form.field.fiscal_code.placeholder'),
                        },
                    },
                ],
            },
            {
                title: $t('form.parent.add.group.contacts'),
                icon: 'i-lucide-notebook',
                fields: [
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.phone_number.label'),
                            name: 'phoneNumber',
                        },
                        inputProps: {
                            placeholder: $t('form.field.phone_number.placeholder'),
                        },
                    },
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.email.label'),
                            name: 'email',
                        },
                        inputProps: {
                            placeholder: $t('form.field.email.placeholder'),
                        },
                    },
                ],
            },
        ];
    });

    const enrollmentFields = computed<FormFieldGroup<InsertEnrollment>[]>(() => {
        return [
            {
                title: $t('form.enrollment.add.group.athlete'),
                icon: 'i-lucide-user',
                fields: [
                    {
                        renderAs: 'select-menu',
                        formFieldProps: {
                            name: 'athleteId',
                            required: true,
                        },
                        selectProps: {
                            placeholder: $t('form.field.athlete_id.placeholder'),
                            items: athletesItems.value,
                            loading: athletesPending.value,
                        },
                    },
                ],
            },
            {
                title: $t('form.enrollment.add.group.season'),
                icon: 'i-lucide-calendar',
                fields: [
                    {
                        renderAs: 'select-menu',
                        formFieldProps: {
                            name: 'seasonId',
                            required: true,
                        },
                        selectProps: {
                            placeholder: $t('form.field.season_id.placeholder'),
                            items: seasonsItems.value,
                            loading: seasonsPending.value,
                        },
                    },
                ],
            },
            {
                title: $t('form.enrollment.add.group.course'),
                icon: 'i-lucide-dumbbell',
                fields: [
                    {
                        renderAs: 'select-menu',
                        formFieldProps: {
                            name: 'courseId',
                            required: true,
                        },
                        selectProps: {
                            placeholder: $t('form.field.course_id.placeholder'),
                            items: coursesItems.value,
                            loading: coursesPending.value,
                        },
                    },
                ],
            },
            {
                title: $t('form.enrollment.add.group.payment_information'),
                icon: 'i-lucide-badge-euro',
                fields: [
                    {
                        renderAs: 'input-number',
                        formFieldProps: {
                            label: $t('form.field.first_payment.label'),
                            name: 'firstPayment',
                        },
                        inputProps: {
                            placeholder: $t('form.field.payment_amount.placeholder'),
                            ...paymentAmountInputProps,
                        },
                    },
                    {
                        renderAs: 'input-date',
                        formFieldProps: {
                            label: $t('form.field.payment_date.label'),
                            name: 'firstPaymentDate',
                        },
                    },
                    {
                        renderAs: 'radio-group',
                        formFieldProps: {
                            label: $t('form.field.payment_type.label'),
                            name: 'firstPaymentType',
                        },
                        radioGroupProps: {
                            ...paymentTypeInputProps,
                        },
                    },
                    {
                        renderAs: 'input-number',
                        formFieldProps: {
                            label: $t('form.field.second_payment.label'),
                            name: 'secondPayment',
                        },
                        inputProps: {
                            placeholder: $t('form.field.payment_amount.placeholder'),
                            ...paymentAmountInputProps,
                        },
                    },
                    {
                        renderAs: 'input-date',
                        formFieldProps: {
                            label: $t('form.field.payment_date.label'),
                            name: 'secondPaymentDate',
                        },
                    },
                    {
                        renderAs: 'radio-group',
                        formFieldProps: {
                            label: $t('form.field.payment_type.label'),
                            name: 'secondPaymentType',
                        },
                        radioGroupProps: {
                            ...paymentTypeInputProps,
                        },
                    },
                    {
                        renderAs: 'input-number',
                        formFieldProps: {
                            label: $t('form.field.third_payment.label'),
                            name: 'thirdPayment',
                        },
                        inputProps: {
                            placeholder: $t('form.field.payment_amount.placeholder'),
                            ...paymentAmountInputProps,
                        },
                    },
                    {
                        renderAs: 'input-date',
                        formFieldProps: {
                            label: $t('form.field.payment_date.label'),
                            name: 'thirdPaymentDate',
                        },
                    },
                    {
                        renderAs: 'radio-group',
                        formFieldProps: {
                            label: $t('form.field.payment_type.label'),
                            name: 'thirdPaymentType',
                        },
                        radioGroupProps: {
                            ...paymentTypeInputProps,
                        },
                    },
                ],
            },
            {
                title: $t('form.enrollment.add.group.certificate'),
                icon: 'i-lucide-briefcase-medical',
                fields: [
                    {
                        renderAs: 'input-file',
                        formFieldProps: {
                            name: 'certificateStorageKey',
                        },
                        fileUploadProps: {
                            description: $t(
                                'form.field.certificate_storage_key.description',
                                { size: formatFileSize(FILE_MAX_SIZE) },
                            ),
                            accept: FILE_ACCEPTED_TYPES.join(','),
                            interactive: false,
                        },
                        buttonProps: {
                            variant: 'subtle',
                            color: 'neutral',
                        },
                    },
                    {
                        renderAs: 'input-date',
                        formFieldProps: {
                            label: $t('form.field.certificate_expiration_date.label'),
                            name: 'certificateExpirationDate',
                            help: formAction === 'add' ? $t('form.field.certificate_expiration_date.help') : undefined,
                        },
                    },
                ],
            },
        ];
    });

    const seasonFields = computed<FormField<InsertSeason>[]>(() => {
        return [
            {
                renderAs: 'input-number',
                formFieldProps: {
                    label: $t('form.field.start_year.label'),
                    name: 'startYear',
                    required: true,
                },
                inputProps: {
                    placeholder: $t('form.field.start_year.placeholder'),
                    formatOptions: {
                        useGrouping: false,
                    },
                },
            },
            {
                renderAs: 'input-number',
                formFieldProps: {
                    label: $t('form.field.end_year.label'),
                    name: 'endYear',
                    required: true,
                },
                inputProps: {
                    placeholder: $t('form.field.end_year.placeholder'),
                    formatOptions: {
                        useGrouping: false,
                    },
                },
            },
        ];
    });

    const activityFields = computed<FormField<InsertActivity>[]>(() => {
        return [
            {
                renderAs: 'input',
                formFieldProps: {
                    label: $t('form.field.activity_name.label'),
                    name: 'name',
                    required: true,
                },
                inputProps: {
                    placeholder: $t('form.field.activity_name.placeholder'),
                },
            },
        ];
    });

    const courseFields = computed<FormFieldGroup<InsertCourse>[]>(() => {
        return [
            {
                fields: [
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.course_code.label'),
                            name: 'code',
                            required: true,
                        },
                        inputProps: {
                            placeholder: $t('form.field.course_code.placeholder'),
                        },
                    },
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.course_name.label'),
                            name: 'name',
                        },
                        inputProps: {
                            placeholder: $t('form.field.course_name.placeholder'),
                        },
                    },

                ],
            },
            {
                title: $t('form.course.add.group.activity'),
                icon: 'i-lucide-zap',
                fields: [
                    {
                        renderAs: 'radio-group',
                        formFieldProps: {
                            name: 'activityId',
                            required: true,
                        },
                        radioGroupProps: {
                            items: activitiesItems.value,
                            variant: 'table',
                            orientation: 'horizontal',
                            indicator: 'hidden',
                            ui: {
                                item: 'w-full',
                            },
                        },
                    },
                ],
            },
        ];
    });

    function defineFormFields<T extends {
        [K in keyof FormSchemas]: ComputedRef<FormField<FormSchemas[K]>[] | FormFieldGroup<FormSchemas[K]>[]>
    }>(fields: T) {
        return fields;
    }

    const formsFields = defineFormFields({
        athlete: athleteFields,
        parent: parentFields,
        enrollment: enrollmentFields,
        season: seasonFields,
        activity: activityFields,
        course: courseFields,
    });

    const formFields = formsFields[formType];

    return {
        initialState,
        formFields,
    };
}
