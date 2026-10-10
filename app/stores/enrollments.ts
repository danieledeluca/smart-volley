export const useEnrollmentsStore = defineStore('enrollments', () => {
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

    return {
        enrollments,
        enrollmentsPending,
        enrollmentsError,
        filterState,
        filterFields,
        refreshEnrollments,
        clearFilters,
    };
});
