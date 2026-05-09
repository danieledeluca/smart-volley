import type { FormError, FormSubmitEvent, InputNumberProps, SelectItem } from '@nuxt/ui';
import type { InsertEnrollment } from '~~/lib/db/schema';
import type { FetchError } from 'ofetch';

import type {
    CertificateStatusEnum,
    EnrollmentsFiltersSchema,
    FormField,
    FormFieldGroup,
    MissingPaymentEnum,
} from '#imports';

export const useEnrollmentsStore = defineStore('enrollments', () => {
    const { $csrfFetch } = useNuxtApp();
    const toast = useToast();

    const athletesStore = useAthletesStore();
    const seasonsStore = useSeasonsStore();
    const activitiesStore = useActivitiesStore();
    const coursesStore = useCoursesStore();

    const { athletesItems, athletesPending } = storeToRefs(athletesStore);
    const { seasonsItems, seasonsPending } = storeToRefs(seasonsStore);
    const { activitiesItems, activitiesPending } = storeToRefs(activitiesStore);
    const { coursesItems, coursesPending } = storeToRefs(coursesStore);

    const isAddingEnrollment = ref(false);
    const addingEnrollmentErrors = ref<FormError[]>([]);

    const enrollmentsFiltersInitialState: EnrollmentsFiltersSchema = {
        athleteName: undefined,
        seasonId: undefined,
        activityId: undefined,
        courseId: undefined,
        missingPayment: undefined,
        certificateStatus: undefined,
    };

    const enrollmentAddInitialState: Partial<InsertEnrollment> = {
        athleteId: undefined,
        seasonId: undefined,
        activityId: undefined,
        courseId: undefined,
        volleyAccount: undefined,
        volleyBalance: undefined,
        volleyBalanceSecondary: undefined,
        firstInstallment: undefined,
        secondInstallment: undefined,
        thirdInstallment: undefined,
        certificateExpirationDate: undefined,
    };

    const enrollmentsFiltersState = reactive({ ...enrollmentsFiltersInitialState });

    const enrollmentAddState = reactive({ ...enrollmentAddInitialState });

    const {
        data: enrollments,
        pending: enrollmentsPending,
        error: enrollmentsError,
        refresh: refreshEnrollments,
    } = useLazyFetch('/api/enrollments', {
        headers: useRequestHeaders(['cookie']),
        query: enrollmentsFiltersState,
        watch: false,
    });

    const clearEnrollmentsFilters = () => {
        Object.assign(enrollmentsFiltersState, enrollmentsFiltersInitialState);

        refreshEnrollments();
    };

    const clearEnrollmentAddForm = () => {
        Object.assign(enrollmentAddState, enrollmentAddInitialState);

        refreshEnrollments();
    };

    const addEnrollment = async (event: FormSubmitEvent<InsertEnrollment>) => {
        try {
            isAddingEnrollment.value = true;

            await $csrfFetch('/api/enrollments', {
                method: 'POST',
                body: event.data,
            });

            clearEnrollmentAddForm();

            toast.add({
                description: $t('form.add_enrollment.success'),
                color: 'success',
            });
        } catch (err) {
            const error = err as FetchError;

            if (error.data?.data) {
                addingEnrollmentErrors.value = error.data?.data;
            } else {
                toast.add({
                    description: error.statusMessage || 'An unknown error occurred.',
                    color: 'error',
                });
            }
        }

        isAddingEnrollment.value = false;
    };

    const missingPaymentItems: Array<SelectItem & { value: MissingPaymentEnum }> = [
        {
            label: $t('form.field.volley_account.label'),
            value: 'volleyAccount',
        },
        {
            label: $t('form.field.volley_balance.label'),
            value: 'volleyBalance',
        },
        {
            label: $t('form.field.volley_balance_secondary.label'),
            value: 'volleyBalanceSecondary',
        },
        {
            label: $t('form.field.first_installment.label'),
            value: 'firstInstallment',
        },
        {
            label: $t('form.field.second_installment.label'),
            value: 'secondInstallment',
        },
        {
            label: $t('form.field.third_installment.label'),
            value: 'thirdInstallment',
        },
    ];

    const certificateStatusItems: Array<SelectItem & { value: CertificateStatusEnum }> = [
        {
            label: $t('form.field.certificate_status.item.valid'),
            value: 'valid',
        },
        {
            label: $t('form.field.certificate_status.item.expired'),
            value: 'expired',
        },
        {
            label: $t('form.field.certificate_status.item.missing'),
            value: 'missing',
        },
    ];

    const enrollmentsFiltersFields = computed<FormField<EnrollmentsFiltersSchema>[][]>(() => {
        return [
            [
                {
                    renderAs: 'input',
                    debounce: true,
                    formFieldProps: {
                        label: $t('form.field.name.label'),
                        name: 'athleteName',
                    },
                    inputProps: {
                        placeholder: $t('form.field.name.placeholder'),
                        icon: 'i-lucide-user',
                    },
                },
            ],
            [
                {
                    renderAs: 'select-menu',
                    formFieldProps: {
                        label: $t('form.field.season_id.label'),
                        name: 'seasonId',
                    },
                    selectProps: {
                        placeholder: $t('form.field.season_id.placeholder'),
                        variant: 'subtle',
                        icon: 'i-lucide-calendar',
                        items: seasonsItems.value,
                        loading: seasonsPending.value,
                    },
                },
                {
                    renderAs: 'select-menu',
                    formFieldProps: {
                        label: $t('form.field.activity_id.label'),
                        name: 'activityId',
                    },
                    selectProps: {
                        placeholder: $t('form.field.activity_id.placeholder'),
                        variant: 'subtle',
                        icon: 'i-lucide-zap',
                        items: activitiesItems.value,
                        loading: activitiesPending.value,
                    },
                },
                {
                    renderAs: 'select-menu',
                    formFieldProps: {
                        label: $t('form.field.course_id.label'),
                        name: 'courseId',
                    },
                    selectProps: {
                        placeholder: $t('form.field.course_id.placeholder'),
                        variant: 'subtle',
                        icon: 'i-lucide-dumbbell',
                        items: coursesItems.value,
                        loading: coursesPending.value,
                    },
                },
                {
                    renderAs: 'select',
                    formFieldProps: {
                        label: $t('form.field.missing_payment.label'),
                        name: 'missingPayment',
                    },
                    selectProps: {
                        placeholder: $t('form.field.missing_payment.placeholder'),
                        variant: 'subtle',
                        icon: 'i-lucide-credit-card',
                        items: missingPaymentItems,
                    },
                },
                {
                    renderAs: 'select',
                    formFieldProps: {
                        label: $t('form.field.certificate_status.label'),
                        name: 'certificateStatus',
                    },
                    selectProps: {
                        placeholder: $t('form.field.certificate_status.placeholder'),
                        variant: 'subtle',
                        icon: 'i-lucide-briefcase-medical',
                        items: certificateStatusItems,
                    },
                },
            ],
        ];
    });

    const paymentFieldsProps: InputNumberProps = {
        step: 10,
        min: 0,
        formatOptions: {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'code',
            currencySign: 'accounting',
        },
    };

    const enrollmentAddFields = computed<FormFieldGroup<InsertEnrollment>[]>(() => {
        return [
            {
                title: $t('form.add_enrollment.group.athlete'),
                icon: 'i-lucide-user',
                fields: [
                    {
                        renderAs: 'select-menu',
                        formFieldProps: {
                            label: $t('form.field.athlete_id.label'),
                            name: 'athleteId',
                            required: true,
                        },
                        selectProps: {
                            placeholder: $t('form.field.athlete_id.placeholder'),
                            variant: 'subtle',
                            items: athletesItems.value,
                            loading: athletesPending.value,
                        },
                    },
                ],
            },
            {
                title: $t('form.add_enrollment.group.season'),
                icon: 'i-lucide-calendar',
                fields: [
                    {
                        renderAs: 'select-menu',
                        formFieldProps: {
                            label: $t('form.field.season_id.label'),
                            name: 'seasonId',
                            required: true,
                        },
                        selectProps: {
                            placeholder: $t('form.field.season_id.placeholder'),
                            variant: 'subtle',
                            items: seasonsItems.value,
                            loading: seasonsPending.value,
                        },
                    },
                ],
            },
            {
                title: $t('form.add_enrollment.group.activity'),
                icon: 'i-lucide-zap',
                fields: [
                    {
                        renderAs: 'select-menu',
                        formFieldProps: {
                            label: $t('form.field.activity_id.label'),
                            name: 'activityId',
                            required: true,
                        },
                        selectProps: {
                            placeholder: $t('form.field.activity_id.placeholder'),
                            variant: 'subtle',
                            items: activitiesItems.value,
                            loading: activitiesPending.value,
                        },
                    },
                ],
            },
            {
                title: $t('form.add_enrollment.group.course'),
                icon: 'i-lucide-dumbbell',
                fields: [
                    {
                        renderAs: 'select-menu',
                        formFieldProps: {
                            label: $t('form.field.course_id.label'),
                            name: 'courseId',
                            required: true,
                        },
                        selectProps: {
                            placeholder: $t('form.field.course_id.placeholder'),
                            variant: 'subtle',
                            items: coursesItems.value,
                            loading: coursesPending.value,
                        },
                    },
                ],
            },
            {
                title: $t('form.add_enrollment.group.payment_information'),
                icon: 'i-lucide-credit-card',
                fields: [
                    {
                        renderAs: 'input-number',
                        formFieldProps: {
                            label: $t('form.field.volley_account.label'),
                            name: 'volleyAccount',
                        },
                        inputProps: {
                            placeholder: $t('form.field.volley_account.placeholder'),
                            variant: 'subtle',
                            ...paymentFieldsProps,
                        },
                    },
                    {
                        renderAs: 'input-number',
                        formFieldProps: {
                            label: $t('form.field.volley_balance.label'),
                            name: 'volleyBalance',
                        },
                        inputProps: {
                            placeholder: $t('form.field.volley_balance.placeholder'),
                            variant: 'subtle',
                            ...paymentFieldsProps,
                        },
                    },
                    {
                        renderAs: 'input-number',
                        formFieldProps: {
                            label: $t('form.field.volley_balance_secondary.label'),
                            name: 'volleyBalanceSecondary',
                        },
                        inputProps: {
                            placeholder: $t('form.field.volley_balance_secondary.placeholder'),
                            variant: 'subtle',
                            ...paymentFieldsProps,
                        },
                    },
                    {
                        renderAs: 'input-number',
                        formFieldProps: {
                            label: $t('form.field.first_installment.label'),
                            name: 'firstInstallment',
                        },
                        inputProps: {
                            placeholder: $t('form.field.first_installment.placeholder'),
                            variant: 'subtle',
                            ...paymentFieldsProps,
                        },
                    },
                    {
                        renderAs: 'input-number',
                        formFieldProps: {
                            label: $t('form.field.second_installment.label'),
                            name: 'secondInstallment',
                        },
                        inputProps: {
                            placeholder: $t('form.field.second_installment.placeholder'),
                            variant: 'subtle',
                            ...paymentFieldsProps,
                        },
                    },
                    {
                        renderAs: 'input-number',
                        formFieldProps: {
                            label: $t('form.field.third_installment.label'),
                            name: 'thirdInstallment',
                        },
                        inputProps: {
                            placeholder: $t('form.field.third_installment.placeholder'),
                            variant: 'subtle',
                            ...paymentFieldsProps,
                        },
                    },
                ],
            },
            {
                title: $t('form.add_enrollment.group.certificate'),
                icon: 'i-lucide-briefcase-medical',
                fields: [
                    {
                        renderAs: 'input-date',
                        formFieldProps: {
                            label: $t('form.field.certificate_expiration_date.label'),
                            name: 'certificateExpirationDate',
                        },
                        inputProps: {
                            variant: 'subtle',
                        },
                    },
                ],
            },
        ];
    });

    return {
        isAddingEnrollment,
        addingEnrollmentErrors,
        enrollments,
        enrollmentsPending,
        enrollmentsError,
        enrollmentsFiltersState,
        enrollmentsFiltersFields,
        enrollmentAddState,
        enrollmentAddFields,
        refreshEnrollments,
        clearEnrollmentsFilters,
        addEnrollment,
    };
});
