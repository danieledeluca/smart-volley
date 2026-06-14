import type { SelectEnrollmentWithRelations } from '~~/lib/db/schema';

export const useEnrollmentsStore = defineStore('enrollments', () => {
    const route = useRoute();
    const { filterState, filterFields, clearFilters } = useFilters('enrollment');

    const {
        data: enrollments,
        pending: enrollmentsPending,
        error: enrollmentsError,
        refresh: refreshEnrollments,
    } = useLazyFetch('/api/enrollments', {
        query: filterState,
        watch: false,
    });

    const enrollmentUrlWithId = computed(() => `/api/enrollments/${route.params.id}`);

    const {
        data: currentEnrollment,
        pending: currentEnrollmentPending,
        error: currentEnrollmentError,
        refresh: refreshCurrentEnrollment,
    } = useLazyFetch<SelectEnrollmentWithRelations>(enrollmentUrlWithId, {
        immediate: false,
        watch: false,
    });

    effect(() => {
        const enrollmentRoutes = ['dashboard-enrollments', 'dashboard-payment', 'dashboard-certificates'];
        const isEnrollmentRoute = enrollmentRoutes.some((enrollmentRoute) => {
            return route.name?.toString()?.startsWith(enrollmentRoute);
        });

        if (!isEnrollmentRoute) {
            clearFilters();
        }
    });

    return {
        enrollments,
        enrollmentsPending,
        enrollmentsError,
        currentEnrollment,
        currentEnrollmentPending,
        currentEnrollmentError,
        filterState,
        filterFields,
        refreshEnrollments,
        refreshCurrentEnrollment,
        clearFilters,
    };
});
