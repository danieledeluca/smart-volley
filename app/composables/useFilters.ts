import type { CheckboxGroupItem } from '@nuxt/ui';

type Filters = {
    enrollment: EnrollmentsFilters;
};

export function useFilters<K extends keyof Filters>(formType: K) {
    const route = useRoute();
    const seasonsStore = useSeasonsStore();
    const activitiesStore = useActivitiesStore();
    const coursesStore = useCoursesStore();

    const { seasonsItems, seasonsPending } = storeToRefs(seasonsStore);
    const { activitiesItems } = storeToRefs(activitiesStore);
    const { coursesItems, coursesPending } = storeToRefs(coursesStore);

    // Initial states
    const enrollmentsFiltersInitialState: EnrollmentsFilters = {
        seasonId: undefined,
        activityId: undefined,
        courseId: undefined,
        certificateStatus: undefined,
    };

    const initialStates: { [K in keyof Filters]: Filters[K] } = {
        enrollment: enrollmentsFiltersInitialState,
    };

    const initialState = initialStates[formType];

    // States
    const enrollmentsFiltersState = computed<EnrollmentsFilters>(() => {
        const result = EnrollmentsFiltersSchema.safeParse(route.query);

        return result.success ? result.data : { ...initialState };
    });

    const filtersStates: { [K in keyof Filters]: ComputedRef<Filters[K]> } = {
        enrollment: enrollmentsFiltersState,
    };

    const filterState = filtersStates[formType];

    // Filters fields
    const certificateStatusItems: Array<CheckboxGroupItem & { value: CertificateStatus }> = [
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

    const enrollmentsFiltersFields = computed<FormFieldGroup<EnrollmentsFilters>[]>(() => {
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

    const filtersFields: { [K in keyof Filters]: ComputedRef<FormFieldGroup<Filters[K]>[]> } = {
        enrollment: enrollmentsFiltersFields,
    };

    const filterFields = filtersFields[formType];

    return {
        filterState,
        filterFields,
    };
}
