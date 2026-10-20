export const useDashboardStore = defineStore('dashboard', () => {
    const seasonsStore = useSeasonsStore();

    const { seasons, seasonsItems, seasonsPending } = storeToRefs(seasonsStore);

    const selectedSeasonId = ref<number>();

    const seasonId = computed({
        get: () => selectedSeasonId.value || seasons.value?.[0]?.id,
        set: (value) => {
            selectedSeasonId.value = value;
        },
    });

    const {
        data: stats,
        pending: statsPending,
        error: statsError,
        refresh: refreshStats,
    } = useLazyFetch('/api/dashboard', {
        query: {
            seasonId: selectedSeasonId,
        },
    });

    return {
        stats,
        statsPending,
        statsError,
        seasons,
        seasonsItems,
        seasonsPending,
        seasonId,
        refreshStats,
    };
});
