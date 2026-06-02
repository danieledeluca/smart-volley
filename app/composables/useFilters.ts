import type { SelectItem } from '@nuxt/ui';
import type { ParentsFiltersSchema } from '~~/shared/utils/zod-schema';

import type {
    AthletesFiltersSchema,
    CertificateStatusEnum,
    EnrollmentsFiltersSchema,
    MissingPaymentEnum,
} from '#imports';

type FiltersSchemas = {
    athlete: AthletesFiltersSchema;
    parent: ParentsFiltersSchema;
    enrollment: EnrollmentsFiltersSchema;
};

export function useFilters<K extends keyof FiltersSchemas>(formType: K) {
    const athletesStore = useAthletesStore();
    const parentsStore = useParentsStore();
    const enrollmentsStore = useEnrollmentsStore();
    const seasonsStore = useSeasonsStore();
    const activitiesStore = useActivitiesStore();
    const coursesStore = useCoursesStore();

    const { seasonsItems, seasonsPending } = storeToRefs(seasonsStore);
    const { activitiesItems, activitiesPending } = storeToRefs(activitiesStore);
    const { coursesItems, coursesPending } = storeToRefs(coursesStore);

    // Initial states
    const athletesFiltersInitialState: AthletesFiltersSchema = {
        name: undefined,
    };
    const parentsFiltersInitialState: ParentsFiltersSchema = {
        name: undefined,
    };
    const enrollmentsFiltersInitialState: EnrollmentsFiltersSchema = {
        athleteName: undefined,
        seasonId: undefined,
        activityId: undefined,
        courseId: undefined,
        missingPayment: undefined,
        certificateStatus: undefined,
    };

    const initialStates = {
        athlete: athletesFiltersInitialState,
        parent: parentsFiltersInitialState,
        enrollment: enrollmentsFiltersInitialState,
    };

    const initialState = initialStates[formType];

    // States
    const athletesFiltersState = ref({ ...athletesFiltersInitialState });
    const parentsFiltersState = ref({ ...parentsFiltersInitialState });
    const enrollmentsFiltersState = ref({ ...enrollmentsFiltersInitialState });

    const filtersStates = {
        athlete: athletesFiltersState,
        parent: parentsFiltersState,
        enrollment: enrollmentsFiltersState,
    };

    const filterState = filtersStates[formType];

    // Filters fields
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

    const athletesFiltersFields = computed<FormField<AthletesFiltersSchema>[][]>(() => {
        return [
            [
                {
                    renderAs: 'input',
                    debounce: true,
                    formFieldProps: {
                        name: 'name',
                    },
                    inputProps: {
                        placeholder: $t('form.field.name.placeholder'),
                        icon: 'i-lucide-search',
                    },
                },
            ],
        ];
    });

    const parentsFiltersFields = computed<FormField<ParentsFiltersSchema>[][]>(() => {
        return [
            [
                {
                    renderAs: 'input',
                    debounce: true,
                    formFieldProps: {
                        name: 'name',
                    },
                    inputProps: {
                        placeholder: $t('form.field.name.placeholder'),
                        icon: 'i-lucide-search',
                    },
                },
            ],
        ];
    });

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

    const filtersFields = {
        athlete: athletesFiltersFields,
        parent: parentsFiltersFields,
        enrollment: enrollmentsFiltersFields,
    };

    const filterFields = filtersFields[formType];

    // Clear filters
    const clearFilters = () => {
        filterState.value = { ...initialState };

        const refreshLists = {
            athlete: athletesStore.refreshAthletes,
            parent: parentsStore.refreshParents,
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
