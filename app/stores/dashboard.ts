export const useDashboardStore = defineStore('dashboard', () => {
    const seasonsStore = useSeasonsStore();

    const { seasons, seasonsItems, seasonsPending } = storeToRefs(seasonsStore);

    const seasonId = ref<number>();

    const { data: stats, pending: statsPending, error: statsError } = useLazyFetch('/api/dashboard', {
        query: {
            seasonId,
        },
    });

    watchEffect(() => {
        seasonId.value = seasons.value?.[0]?.id;
    }, {
        flush: 'post',
    });

    return {
        stats,
        statsPending,
        statsError,
        seasons,
        seasonsItems,
        seasonsPending,
        seasonId,
    };
});
