import type { SelectMenuItem } from '@nuxt/ui';

export const useSeasonsStore = defineStore('seasons', () => {
    const {
        data: seasons,
        pending: seasonsPending,
        error: seasonsError,
        refresh: refreshSeasons,
    } = useLazyFetch('/api/seasons');

    const seasonsItems = computed(() => {
        return seasons.value
            ?.toSorted((seasonA, seasonB) => seasonB.startYear - seasonA.startYear)
            ?.map<SelectMenuItem>((season) => {
                return {
                    label: `${season.startYear} - ${season.endYear}`,
                    value: season.id,
                };
            });
    });

    return {
        seasons,
        seasonsItems,
        seasonsPending,
        seasonsError,
        refreshSeasons,
    };
});
