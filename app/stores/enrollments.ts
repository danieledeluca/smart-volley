import type { SelectMenuItem } from '@nuxt/ui';

export const useEnrollmentsStore = defineStore('enrollments', () => {
    const seasonsStore = useSeasonsStore();
    const activitiesStore = useActivitiesStore();
    const coursesStore = useCoursesStore();

    const { seasons, seasonsPending } = storeToRefs(seasonsStore);
    const { activities, activitiesPending } = storeToRefs(activitiesStore);
    const { courses, coursesPending } = storeToRefs(coursesStore);

    const enrollmentsFiltersInitialState: Partial<EnrollmentsFiltersSchema> = {
        name: undefined,
        season: undefined,
        activity: undefined,
        course: undefined,
        payment: undefined,
        certificateStatus: undefined,
    };

    const enrollmentsFiltersState = reactive({ ...enrollmentsFiltersInitialState });

    const {
        data: enrollments,
        pending: enrollmentsPending,
        error: enrollmentsError,
        refresh: refreshEnrollments,
    } = useLazyFetch<EnrollmentListItem[]>('/api/enrollments', {
        headers: useRequestHeaders(['cookie']),
        query: enrollmentsFiltersState,
        watch: false,
    });

    const clearEnrollmentsFilters = () => {
        // Reset filters
        Object.assign(enrollmentsFiltersState, enrollmentsFiltersInitialState);

        // Refresh enrollments
        refreshEnrollments();
    };

    const paymentItems: Array<SelectMenuItem & { value: PaymentFilters }> = [
        {
            label: 'Volley account',
            value: 'volley_account',
        },
        {
            label: 'Volley balance',
            value: 'volley_balance',
        },
        {
            label: 'Volley balance 2',
            value: 'volley_balance_secondary',
        },
        {
            label: 'First installment',
            value: 'first_installment',
        },
        {
            label: 'Second installment',
            value: 'second_installment',
        },
        {
            label: 'Third installment',
            value: 'third_installment',
        },
    ];

    const certificateStatusItems: Array<SelectMenuItem & { value: CertificateDateStatus }> = [
        {
            label: 'Valid',
            value: 'valid',
        },
        {
            label: 'Expired',
            value: 'expired',
        },
        {
            label: 'Missing',
            value: 'missing',
        },
    ];

    const enrollmentsFiltersFields = computed<FormField<EnrollmentsFiltersSchema>[][]>(() => {
        return [
            [
                {
                    renderAs: 'input',
                    label: $t('form.name.label'),
                    name: 'name',
                    placeholder: $t('form.name.placeholder'),
                    icon: 'i-lucide-user',
                    debounce: true,
                },
            ],
            [
                {
                    renderAs: 'select-menu',
                    label: $t('form.season.label'),
                    name: 'season',
                    items: seasons.value,
                    loading: seasonsPending.value,
                    placeholder: $t('form.season.placeholder'),
                    icon: 'i-lucide-calendar',
                },
                {
                    renderAs: 'select-menu',
                    label: $t('form.activity.label'),
                    name: 'activity',
                    items: activities.value,
                    loading: activitiesPending.value,
                    placeholder: $t('form.activity.placeholder'),
                    icon: 'i-lucide-zap',
                },
                {
                    renderAs: 'select-menu',
                    label: $t('form.course.label'),
                    name: 'course',
                    items: courses.value,
                    loading: coursesPending.value,
                    placeholder: $t('form.course.placeholder'),
                    icon: 'i-lucide-dumbbell',
                },
                {
                    renderAs: 'select-menu',
                    label: 'Payment',
                    name: 'payment',
                    items: paymentItems,
                    placeholder: 'Select missing payments',
                    icon: 'i-lucide-credit-card',
                },
                {
                    renderAs: 'select-menu',
                    label: 'Certificate status',
                    name: 'certificateStatus',
                    items: certificateStatusItems,
                    placeholder: 'Select certificate status',
                    icon: 'i-lucide-briefcase-medical',
                },
            ],
        ];
    });

    return {
        enrollments,
        enrollmentsPending,
        enrollmentsError,
        refreshEnrollments,
        clearEnrollmentsFilters,
        enrollmentsFiltersState,
        enrollmentsFiltersFields,
    };
});
