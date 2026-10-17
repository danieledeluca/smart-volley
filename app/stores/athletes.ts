import type { SelectMenuItem } from '@nuxt/ui';

export const useAthletesStore = defineStore('athletes', () => {
    const {
        data: athletes,
        pending: athletesPending,
        error: athletesError,
        refresh: refreshAthletes,
    } = useLazyFetch('/api/athletes');

    const athletesItems = computed(() => {
        return athletes.value
            ?.toSorted((athleteA, athleteB) => {
                return athleteA.name.localeCompare(athleteB.name);
            })
            .map<SelectMenuItem>((athlete) => {
                return {
                    label: athlete.name,
                    description: athlete.fiscalCode,
                    value: athlete.id,
                };
            });
    });

    return {
        athletes,
        athletesItems,
        athletesPending,
        athletesError,
        refreshAthletes,
    };
});
