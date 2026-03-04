import type { SelectItem } from '@nuxt/ui';

export const useEnrollmentsStore = defineStore('enrollments', () => {
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

    const athletesState = reactive<AthletesFiltersSchema>({
        name: undefined,
    });

    const {
        data: athletes,
        pending: athletesPending,
        error: athletesError,
        refresh: refreshAthletes,
    } = useLazyFetch<AthleteListItem[]>('/api/athletes', {
        headers: useRequestHeaders(['cookie']),
        query: athletesState,
        watch: false,
    });

    const { data: seasons, pending: seasonsPending } = useLazyFetch('/api/seasons', {
        headers: useRequestHeaders(['cookie']),
        transform: (seasons) => {
            return seasons.map<SelectItem>((season) => {
                return {
                    label: `${season.starter_year} - ${season.end_year}`,
                    value: season.id,
                };
            });
        },
    });

    const { data: activities, pending: activitiesPending } = useLazyFetch('/api/activities', {
        headers: useRequestHeaders(['cookie']),
        transform: (activities) => {
            return activities.map<SelectItem>((activity) => {
                return {
                    label: activity.name,
                    value: activity.id,
                };
            });
        },
    });

    const { data: courses, pending: coursesPending } = useLazyFetch('/api/course', {
        headers: useRequestHeaders(['cookie']),
        transform: (courses) => {
            return courses.map<SelectItem>((course) => {
                return {
                    label: course.name,
                    value: course.id,
                };
            });
        },
    });

    const enrollmentsFiltersFields = computed<FilterField<EnrollmentsFiltersSchema>[]>(() => {
        return [
            {
                type: 'input',
                label: $t('form.name.label'),
                name: 'name',
                placeholder: $t('form.name.placeholder'),
                icon: 'i-lucide-user',
                debounce: true,
            },
            {
                type: 'select',
                label: $t('form.season.label'),
                name: 'season',
                items: seasons.value,
                loading: seasonsPending.value,
                placeholder: $t('form.season.placeholder'),
                icon: 'i-lucide-calendar',
            },
            {
                type: 'select',
                label: $t('form.activity.label'),
                name: 'activity',
                items: activities.value,
                loading: activitiesPending.value,
                placeholder: $t('form.activity.placeholder'),
                icon: 'i-lucide-zap',
            },
            {
                type: 'select',
                label: $t('form.course.label'),
                name: 'course',
                items: courses.value,
                loading: coursesPending.value,
                placeholder: $t('form.course.placeholder'),
                icon: 'i-lucide-dumbbell',
            },
        ];
    });

    const athletesFiltersFields = computed<FilterField<AthletesFiltersSchema>[]>(() => {
        return [
            {
                type: 'input',
                label: $t('form.name.label'),
                name: 'name',
                placeholder: $t('form.name.placeholder'),
                icon: 'i-lucide-user',
                debounce: true,
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
        athletes,
        athletesPending,
        athletesError,
        refreshAthletes,
        athletesState,
        athletesFiltersFields,
    };
});
