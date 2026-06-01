import type { SelectMenuItem } from '@nuxt/ui';
import type { SelectAthleteWithRelations } from '~~/lib/db/schema';

export const useAthletesStore = defineStore('athletes', () => {
    const route = useRoute();
    const { filterState, filterFields, clearFilters } = useFilters('athlete');

    const {
        data: athletes,
        pending: athletesPending,
        error: athletesError,
        refresh: refreshAthletes,
    } = useLazyFetch('/api/athletes', {
        headers: useRequestHeaders(['cookie']),
        query: filterState,
        watch: false,
    });

    const athletesItems = computed(() => {
        return athletes.value?.map<SelectMenuItem>((athlete) => {
            return {
                label: athlete.name,
                description: athlete.fiscalCode,
                value: athlete.id,
            };
        });
    });

    const athleteUrlWithId = computed(() => `/api/athletes/${route.params.id}`);

    const {
        data: currentAthlete,
        pending: currentAthletePending,
        error: currentAthleteError,
        refresh: refreshCurrentAthlete,
    } = useLazyFetch<SelectAthleteWithRelations>(athleteUrlWithId, {
        headers: useRequestHeaders(['cookie']),
        immediate: false,
        watch: false,
    });

    return {
        athletes,
        athletesItems,
        athletesPending,
        athletesError,
        currentAthlete,
        currentAthletePending,
        currentAthleteError,
        filterState,
        filterFields,
        refreshAthletes,
        refreshCurrentAthlete,
        clearFilters,
    };
});
