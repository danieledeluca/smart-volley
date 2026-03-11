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
            label: $t('form.field.payment.item.volley_account'),
            value: 'volley_account',
        },
        {
            label: $t('form.field.payment.item.volley_balance'),
            value: 'volley_balance',
        },
        {
            label: $t('form.field.payment.item.volley_balance_secondary'),
            value: 'volley_balance_secondary',
        },
        {
            label: $t('form.field.payment.item.first_installment'),
            value: 'first_installment',
        },
        {
            label: $t('form.field.payment.item.second_installment'),
            value: 'second_installment',
        },
        {
            label: $t('form.field.payment.item.third_installment'),
            value: 'third_installment',
        },
    ];

    const certificateStatusItems: Array<SelectMenuItem & { value: CertificateDateStatus }> = [
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
                    label: $t('form.field.name.label'),
                    name: 'name',
                    placeholder: $t('form.field.name.placeholder'),
                    icon: 'i-lucide-user',
                    debounce: true,
                },
            ],
            [
                {
                    renderAs: 'select-menu',
                    label: $t('form.field.season.label'),
                    name: 'season',
                    items: seasons.value,
                    loading: seasonsPending.value,
                    placeholder: $t('form.field.season.placeholder'),
                    icon: 'i-lucide-calendar',
                },
                {
                    renderAs: 'select-menu',
                    label: $t('form.field.activity.label'),
                    name: 'activity',
                    items: activities.value,
                    loading: activitiesPending.value,
                    placeholder: $t('form.field.activity.placeholder'),
                    icon: 'i-lucide-zap',
                },
                {
                    renderAs: 'select-menu',
                    label: $t('form.field.course.label'),
                    name: 'course',
                    items: courses.value,
                    loading: coursesPending.value,
                    placeholder: $t('form.field.course.placeholder'),
                    icon: 'i-lucide-dumbbell',
                },
                {
                    renderAs: 'select-menu',
                    label: $t('form.field.payment.label'),
                    name: 'payment',
                    items: paymentItems,
                    placeholder: $t('form.field.payment.placeholder'),
                    icon: 'i-lucide-credit-card',
                },
                {
                    renderAs: 'select-menu',
                    label: $t('form.field.certificate_status.label'),
                    name: 'certificateStatus',
                    items: certificateStatusItems,
                    placeholder: $t('form.field.certificate_status.placeholder'),
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
