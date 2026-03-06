import type { SelectItem } from '@nuxt/ui';

export const useSeasonsStore = defineStore('seasons', () => {
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

    return {
        seasons,
        seasonsPending,
    };
});
