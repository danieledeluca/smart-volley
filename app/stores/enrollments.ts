export const useEnrollmentsStore = defineStore('enrollments', () => {
    const { filterState, filterFields } = useFilters('enrollment');

    const {
        data: enrollments,
        pending: enrollmentsPending,
        error: enrollmentsError,
        refresh: refreshEnrollments,
    } = useLazyFetch('/api/enrollments', {
        query: filterState,
    });

    return {
        enrollments,
        enrollmentsPending,
        enrollmentsError,
        filterState,
        filterFields,
        refreshEnrollments,
    };
});
