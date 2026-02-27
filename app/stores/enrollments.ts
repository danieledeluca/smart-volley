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
        refresh: refreshEnrollments,
    } = useLazyFetch<EnrollmentListItem[]>('/api/enrollments', {
        query: enrollmentsState,
        watch: false,
    });

    const athletesState = reactive<AthletesFiltersSchema>({
        name: undefined,
    });

    const {
        data: athletes,
        pending: athletesPending,
        refresh: refreshAthletes,
    } = useLazyFetch<AthleteListItem[]>('/api/athletes', {
        query: athletesState,
        watch: false,
    });

    const { data: seasons, pending: seasonsPending } = useLazyFetch('/api/seasons', {
        transform: (seasons) => {
            return seasons.map<SelectItem>((season) => {
                return {
                    label: `${season.starter_year} - ${season.end_year}`,
                    id: season.id,
                };
            });
        },
    });

    const { data: activities, pending: activitiesPending } = useLazyFetch('/api/activities', {
        transform: (activities) => {
            return activities.map<SelectItem>((activity) => {
                return {
                    label: activity.name,
                    id: activity.id,
                };
            });
        },
    });

    const { data: courses, pending: coursesPending } = useLazyFetch('/api/course', {
        transform: (courses) => {
            return courses.map<SelectItem>((course) => {
                return {
                    label: course.name,
                    id: course.id,
                };
            });
        },
    });

    const enrollmentsFields = computed<FilterField<EnrollmentsFiltersSchema>[]>(() => {
        return [
            {
                type: 'input',
                label: $t('form.name.label'),
                name: 'name',
                placeholder: $t('form.name.placeholder'),
                icon: 'i-lucide-user',
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
                label: 'Corso',
                name: 'course',
                items: courses.value,
                loading: coursesPending.value,
                placeholder: 'Seleziona un corso',
                icon: 'i-lucide-dumbbell',
            },
        ];
    });

    const athletesFields = computed<FilterField<AthletesFiltersSchema>[]>(() => {
        return [
            {
                type: 'input',
                label: $t('form.name.label'),
                name: 'name',
                placeholder: $t('form.name.placeholder'),
                icon: 'i-lucide-user',
            },
        ];
    });

    return {
        enrollments,
        enrollmentsPending,
        refreshEnrollments,
        enrollmentsState,
        enrollmentsFields,
        athletes,
        athletesPending,
        refreshAthletes,
        athletesState,
        athletesFields,
        seasons,
        seasonsPending,
        activities,
        activitiesPending,
        courses,
        coursesPending,
    };
});
