import type { CheckboxGroupItem, SelectItem } from '@nuxt/ui';
import type { EnrollmentPaymentField } from '~~/lib/db/schema';
import type { CertificateStatusEnum } from '~~/shared/utils/zod-schema';

import { EnrollmentsFiltersSchema } from '~~/shared/utils/zod-schema';

type FiltersSchemas = {
    enrollment: EnrollmentsFiltersSchema;
};

export function useFilters<K extends keyof FiltersSchemas>(formType: K) {
    const route = useRoute();
    const enrollmentsStore = useEnrollmentsStore();
    const seasonsStore = useSeasonsStore();
    const activitiesStore = useActivitiesStore();
    const coursesStore = useCoursesStore();

    const { seasonsItems, seasonsPending } = storeToRefs(seasonsStore);
    const { activitiesItems } = storeToRefs(activitiesStore);
    const { coursesItems, coursesPending } = storeToRefs(coursesStore);

    // Empty states
    const enrollmentsFiltersEmptyState: EnrollmentsFiltersSchema = {
        seasonId: undefined,
        activityId: undefined,
        courseId: undefined,
        missingPayment: undefined,
        certificateStatus: undefined,
    };

    const emptyStates: { [K in keyof FiltersSchemas]: FiltersSchemas[K] } = {
        enrollment: enrollmentsFiltersEmptyState,
    };

    const emptyState = emptyStates[formType];

    // Initial states
    const enrollmentsResult = EnrollmentsFiltersSchema.safeParse(route.query);
    const enrollmentsFiltersInitialState = enrollmentsResult.success
        ? { ...enrollmentsResult.data }
        : enrollmentsFiltersEmptyState;

    // States
    const enrollmentsFiltersState = ref({ ...enrollmentsFiltersInitialState });

    const filtersStates: { [K in keyof FiltersSchemas]: Ref<FiltersSchemas[K]> } = {
        enrollment: enrollmentsFiltersState,
    };

    const filterState = filtersStates[formType];

    // Filters fields
    const missingPaymentItems: Array<SelectItem & { value: EnrollmentPaymentField }> = [
        {
            label: $t('form.field.volley_account.label'),
            value: 'volleyAccount',
        },
        {
            label: $t('form.field.volley_balance.label'),
            value: 'volleyBalance',
        },
        {
            label: $t('form.field.volley_second_balance.label'),
            value: 'volleySecondBalance',
        },
        {
            label: $t('form.field.gymnastics_first_installment.label'),
            value: 'gymnasticsFirstInstallment',
        },
        {
            label: $t('form.field.gymnastics_second_installment.label'),
            value: 'gymnasticsSecondInstallment',
        },
        {
            label: $t('form.field.gymnastics_third_installment.label'),
            value: 'gymnasticsThirdInstallment',
        },
    ];

    const certificateStatusItems: Array<CheckboxGroupItem & { value: CertificateStatusEnum }> = [
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

    const enrollmentsFiltersFields = computed<FormFieldGroup<EnrollmentsFiltersSchema>[]>(() => {
        return [
            {
                fields: [
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
                        renderAs: 'radio-group',
                        formFieldProps: {
                            label: $t('form.field.activity_id.label'),
                            name: 'activityId',
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
                ],
            },
            {
                title: $t('form.filter.group.payments'),
                icon: 'i-lucide-badge-euro',
                fields: [
                    {
                        renderAs: 'select',
                        formFieldProps: {
                            label: $t('form.field.missing_payment.label'),
                            name: 'missingPayment',
                        },
                        selectProps: {
                            placeholder: $t('form.field.missing_payment.placeholder'),
                            items: missingPaymentItems,
                        },
                    },
                ],
            },
            {
                title: $t('form.filter.group.certificate'),
                icon: 'i-lucide-briefcase-medical',
                fields: [
                    {
                        renderAs: 'checkbox-group',
                        formFieldProps: {
                            label: $t('form.field.certificate_status.label'),
                            name: 'certificateStatus',
                        },
                        checkboxGroupProps: {
                            items: certificateStatusItems,
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

    const filtersFields: { [K in keyof FiltersSchemas]: ComputedRef<FormFieldGroup<FiltersSchemas[K]>[]> } = {
        enrollment: enrollmentsFiltersFields,
    };

    const filterFields = filtersFields[formType];

    // Clear filters
    const clearFilters = () => {
        filterState.value = { ...emptyState };

        const refreshLists: { [K in keyof FiltersSchemas]: () => void } = {
            enrollment: enrollmentsStore.refreshEnrollments,
        };

        const refreshList = refreshLists[formType];

        refreshList?.();
    };

    return {
        filterState,
        filterFields,
        clearFilters,
    };
}
