export const useEnrollmentsStore = defineStore('enrollments', () => {
    const seasonsStore = useSeasonsStore();
    const activitiesStore = useActivitiesStore();
    const coursesStore = useCoursesStore();

    const { seasons, seasonsPending } = storeToRefs(seasonsStore);
    const { activities, activitiesPending } = storeToRefs(activitiesStore);
    const { courses, coursesPending } = storeToRefs(coursesStore);

    const enrollmentsState = reactive<Partial<EnrollmentsFiltersSchema>>({
        name: undefined,
        season: undefined,
        activity: undefined,
        course: undefined,
    });

    const {
        data: enrollments,
        pending: enrollmentsPending,
        error: enrollmentsError,
        refresh: refreshEnrollments,
    } = useLazyFetch<EnrollmentListItem[]>('/api/enrollments', {
        headers: useRequestHeaders(['cookie']),
        query: enrollmentsState,
        watch: false,
    });

    const enrollmentsFiltersFields = computed<FormField<EnrollmentsFiltersSchema>[]>(() => {
        return [
            {
                renderAs: 'input',
                label: $t('form.name.label'),
                name: 'name',
                placeholder: $t('form.name.placeholder'),
                icon: 'i-lucide-user',
                debounce: true,
            },
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
        ];
    });

    return {
        enrollments,
        enrollmentsPending,
        enrollmentsError,
        refreshEnrollments,
        enrollmentsState,
        enrollmentsFiltersFields,
    };
});
