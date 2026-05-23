import type { FormError, FormSubmitEvent, InputNumberProps, SelectItem } from '@nuxt/ui';
import type { InsertEnrollment } from '~~/lib/db/schema';
import type { FetchError } from 'ofetch';

import { formatFileSize } from '~~/lib/utils';
import { FILE_MAX_SIZE } from '~~/lib/utils/constants';

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

    const isLoading = ref(false);
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
        certificateStorageKey: undefined,
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
            isLoading.value = true;

            await $csrfFetch('/api/enrollments', {
                method: 'POST',
                body: toFormData(event.data),
            });

            clearEnrollmentAddForm();

            toast.add({
                description: $t('form.add_enrollment.success'),
                color: 'success',
                icon: 'i-lucide-circle-check',
            });
        } catch (err) {
            const error = err as FetchError;

            if (error.data?.data) {
                addingEnrollmentErrors.value = error.data?.data;
            } else {
                toast.add({
                    description: error.statusMessage || DEFAULT_SERVER_ERROR_MESSAGE,
                    color: 'error',
                    icon: 'i-lucide-circle-x',
                });
            }
        } finally {
            isLoading.value = false;
        }
    };

    const removeEnrollment = async (enrollmentId: number) => {
        try {
            isLoading.value = true;

            await $csrfFetch(`/api/enrollments/${enrollmentId}`, {
                method: 'DELETE',
            });

            refreshEnrollments();

            toast.add({
                description: $t('form.delete_enrollment.success'),
                color: 'success',
                icon: 'i-lucide-circle-check',
            });
        } catch (err) {
            const error = err as FetchError;

            toast.add({
                description: error.statusMessage || DEFAULT_SERVER_ERROR_MESSAGE,
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        } finally {
            isLoading.value = false;
        }
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
                        name: 'athleteName',
                    },
                    inputProps: {
                        placeholder: $t('form.field.name.placeholder'),
                        icon: 'i-lucide-search',
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
                title: $t('form.add_enrollment.group.season'),
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
                title: $t('form.add_enrollment.group.activity'),
                icon: 'i-lucide-zap',
                fields: [
                    {
                        renderAs: 'select-menu',
                        formFieldProps: {
                            name: 'activityId',
                            required: true,
                        },
                        selectProps: {
                            placeholder: $t('form.field.activity_id.placeholder'),
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
                        renderAs: 'input-file',
                        formFieldProps: {
                            name: 'certificateStorageKey',
                        },
                        fileUploadProps: {
                            description: $t(
                                'form.field.certificate_storage_key.description',
                                { size: formatFileSize(FILE_MAX_SIZE) },
                            ),
                            accept: 'image/*',
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
                        },
                    },
                ],
            },
        ];
    });

    return {
        isLoading,
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
        removeEnrollment,
    };
});
