import type { SelectMenuItem } from '@nuxt/ui';

export const useEnrollmentsStore = defineStore('enrollments', () => {
    const athletesStore = useAthletesStore();
    const seasonsStore = useSeasonsStore();
    const activitiesStore = useActivitiesStore();
    const coursesStore = useCoursesStore();

    const { athletesItems, athletesPending } = storeToRefs(athletesStore);
    const { seasonsItems, seasonsPending } = storeToRefs(seasonsStore);
    const { activitiesItems, activitiesPending } = storeToRefs(activitiesStore);
    const { coursesItems, coursesPending } = storeToRefs(coursesStore);

    const enrollmentsFiltersInitialState: Partial<EnrollmentsFiltersSchema> = {
        name: undefined,
        season: undefined,
        activity: undefined,
        course: undefined,
        payment: undefined,
        certificateStatus: undefined,
    };

    const enrollmentsFiltersState = reactive({ ...enrollmentsFiltersInitialState });

    const enrollmentAddInitialState: Partial<EnrollmentAddSchema> = {
        athlete_id: undefined,
        season_id: undefined,
        activity_id: undefined,
        course_id: undefined,
        volley_account: undefined,
        volley_balance: undefined,
        volley_balance_secondary: undefined,
        first_installment: undefined,
        second_installment: undefined,
        third_installment: undefined,
        certificate_expiration_date: undefined,
    };

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

    const {
        showAddForm: showEnrollmentAddForm,
        isAdding: isAddingEnrollment,
        state: enrollmentAddState,
        add: addEnrollment,
    } = useAddForm(
        enrollmentAddInitialState,
        refreshEnrollments,
        '/api/enrollments/add',
        'Enrollment added successfully',
    );

    const clearEnrollmentsFilters = () => {
        // Reset filters
        Object.assign(enrollmentsFiltersState, enrollmentsFiltersInitialState);

        // Refresh enrollments
        refreshEnrollments();
    };

    const paymentItems: Array<SelectMenuItem & { value: PaymentFilters }> = [
        {
            label: $t('form.field.volley_account.label'),
            value: 'volley_account',
        },
        {
            label: $t('form.field.volley_balance.label'),
            value: 'volley_balance',
        },
        {
            label: $t('form.field.volley_balance_secondary.label'),
            value: 'volley_balance_secondary',
        },
        {
            label: $t('form.field.first_installment.label'),
            value: 'first_installment',
        },
        {
            label: $t('form.field.second_installment.label'),
            value: 'second_installment',
        },
        {
            label: $t('form.field.third_installment.label'),
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
                    items: seasonsItems.value,
                    loading: seasonsPending.value,
                    placeholder: $t('form.field.season.placeholder'),
                    icon: 'i-lucide-calendar',
                    variant: 'subtle',
                },
                {
                    renderAs: 'select',
                    label: $t('form.field.activity.label'),
                    name: 'activity',
                    items: activitiesItems.value,
                    loading: activitiesPending.value,
                    placeholder: $t('form.field.activity.placeholder'),
                    icon: 'i-lucide-zap',
                    variant: 'subtle',
                },
                {
                    renderAs: 'select-menu',
                    label: $t('form.field.course.label'),
                    name: 'course',
                    items: coursesItems.value,
                    loading: coursesPending.value,
                    placeholder: $t('form.field.course.placeholder'),
                    icon: 'i-lucide-dumbbell',
                    variant: 'subtle',
                },
                {
                    renderAs: 'select',
                    label: $t('form.field.payment.label'),
                    name: 'payment',
                    items: paymentItems,
                    placeholder: $t('form.field.payment.placeholder'),
                    icon: 'i-lucide-credit-card',
                    variant: 'subtle',
                },
                {
                    renderAs: 'select',
                    label: $t('form.field.certificate_status.label'),
                    name: 'certificateStatus',
                    items: certificateStatusItems,
                    placeholder: $t('form.field.certificate_status.placeholder'),
                    icon: 'i-lucide-briefcase-medical',
                    variant: 'subtle',
                },
            ],
        ];
    });

    const enrollmentAddFields = computed<GroupFormField<EnrollmentAddSchema>[]>(() => {
        return [
            {
                title: $t('form.add_enrollment.group.athlete'),
                icon: 'i-lucide-user',
                fields: [
                    {
                        renderAs: 'select-menu',
                        label: $t('form.field.athlete.label'),
                        name: 'athlete_id',
                        items: athletesItems.value,
                        loading: athletesPending.value,
                        placeholder: $t('form.field.athlete.placeholder'),
                        required: true,
                        variant: 'subtle',
                    },
                ],
            },
            {
                title: $t('form.add_enrollment.group.season'),
                icon: 'i-lucide-calendar',
                fields: [
                    {
                        renderAs: 'select-menu',
                        label: $t('form.field.season.label'),
                        name: 'season_id',
                        items: seasonsItems.value,
                        loading: seasonsPending.value,
                        placeholder: $t('form.field.season.placeholder'),
                        required: true,
                        variant: 'subtle',
                    },
                ],
            },
            {
                title: $t('form.add_enrollment.group.activity'),
                icon: 'i-lucide-zap',
                fields: [
                    {
                        renderAs: 'select',
                        label: $t('form.field.activity.label'),
                        name: 'activity_id',
                        items: activitiesItems.value,
                        loading: activitiesPending.value,
                        placeholder: $t('form.field.activity.placeholder'),
                        required: true,
                        variant: 'subtle',
                    },
                ],
            },
            {
                title: $t('form.add_enrollment.group.course'),
                icon: 'i-lucide-dumbbell',
                fields: [
                    {
                        renderAs: 'select-menu',
                        label: $t('form.field.course.label'),
                        name: 'course_id',
                        items: coursesItems.value,
                        loading: coursesPending.value,
                        placeholder: $t('form.field.course.placeholder'),
                        required: true,
                        variant: 'subtle',
                    },
                ],
            },
            {
                title: $t('form.add_enrollment.group.payment_information'),
                icon: 'i-lucide-credit-card',
                fields: [
                    {
                        renderAs: 'input-number',
                        label: $t('form.field.volley_account.label'),
                        name: 'volley_account',
                        placeholder: $t('form.field.volley_account.placeholder'),
                        variant: 'subtle',
                        step: 0.10,
                        min: VOLLEY_ACCOUNT_MIN_VALUE,
                        formatOptions: {
                            style: 'currency',
                            currency: 'EUR',
                            currencyDisplay: 'code',
                            currencySign: 'accounting',
                        },
                    },
                    {
                        renderAs: 'input-number',
                        label: $t('form.field.volley_balance.label'),
                        name: 'volley_balance',
                        placeholder: $t('form.field.volley_balance.placeholder'),
                        variant: 'subtle',
                        step: 0.10,
                        min: VOLLEY_BALANCE_MIN_VALUE,
                        formatOptions: {
                            style: 'currency',
                            currency: 'EUR',
                            currencyDisplay: 'code',
                            currencySign: 'accounting',
                        },
                    },
                    {
                        renderAs: 'input-number',
                        label: $t('form.field.volley_balance_secondary.label'),
                        name: 'volley_balance_secondary',
                        placeholder: $t('form.field.volley_balance_secondary.placeholder'),
                        variant: 'subtle',
                        step: 0.10,
                        min: VOLLEY_BALANCE_SECONDARY_MIN_VALUE,
                        formatOptions: {
                            style: 'currency',
                            currency: 'EUR',
                            currencyDisplay: 'code',
                            currencySign: 'accounting',
                        },
                    },
                    {
                        renderAs: 'input-number',
                        label: $t('form.field.first_installment.label'),
                        name: 'first_installment',
                        placeholder: $t('form.field.first_installment.placeholder'),
                        variant: 'subtle',
                        step: 0.10,
                        min: FIRST_INSTALLMENT_MIN_VALUE,
                        formatOptions: {
                            style: 'currency',
                            currency: 'EUR',
                            currencyDisplay: 'code',
                            currencySign: 'accounting',
                        },
                    },
                    {
                        renderAs: 'input-number',
                        label: $t('form.field.second_installment.label'),
                        name: 'second_installment',
                        placeholder: $t('form.field.second_installment.placeholder'),
                        variant: 'subtle',
                        step: 0.10,
                        min: SECOND_INSTALLMENT_MIN_VALUE,
                        formatOptions: {
                            style: 'currency',
                            currency: 'EUR',
                            currencyDisplay: 'code',
                            currencySign: 'accounting',
                        },
                    },
                    {
                        renderAs: 'input-number',
                        label: $t('form.field.third_installment.label'),
                        name: 'third_installment',
                        placeholder: $t('form.field.third_installment.placeholder'),
                        variant: 'subtle',
                        step: 0.10,
                        min: THIRD_INSTALLMENT_MIN_VALUE,
                        formatOptions: {
                            style: 'currency',
                            currency: 'EUR',
                            currencyDisplay: 'code',
                            currencySign: 'accounting',
                        },
                    },
                ],
            },
        ];
    });

    return {
        enrollments,
        enrollmentsPending,
        enrollmentsError,
        refreshEnrollments,
        clearEnrollmentsFilters,
        addEnrollment,
        showEnrollmentAddForm,
        isAddingEnrollment,
        enrollmentsFiltersState,
        enrollmentsFiltersFields,
        enrollmentAddState,
        enrollmentAddFields,
    };
});
