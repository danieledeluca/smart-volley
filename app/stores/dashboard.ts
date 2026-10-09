export const useDashboardStore = defineStore('dashboard', () => {
    const seasonsStore = useSeasonsStore();

    const { seasons, seasonsItems, seasonsPending } = storeToRefs(seasonsStore);

    const {
        data: enrollments,
        pending: enrollmentsPending,
        error: enrollmentsError,
    } = useLazyFetch('/api/enrollments');

    return {
        enrollments,
        enrollmentsPending,
        enrollmentsError,
        seasons,
        seasonsItems,
        seasonsPending,
    };
});
