export const useAthletesStore = defineStore('athletes', () => {
    const route = useRoute();

    const { data: athletes, pending: athletesPending } = useFetch('/api/athletes', {
        lazy: true,
    });

    const athleteUrlWithId = computed(() => `/api/athletes/${route.params.id}`);

    const {
        data: currentAthlete,
        pending: currentAthletePending,
        refresh: refreshCurrentAthlete,
    } = useFetch<AthleteItem>(athleteUrlWithId, {
        lazy: true,
        immediate: false,
        watch: false,
    });

    const { data: seasons, pending: seasonsPending } = useFetch('/api/seasons', {
        lazy: true,
    });

    const { data: activities, pending: activitiesPending } = useFetch('/api/activities', {
        lazy: true,
    });

    effect(() => {
        if (route.name?.toString() === 'athletes-id') {
            if (currentAthlete.value?.id.toString() !== route.params.id) {
                refreshCurrentAthlete();
            }
        }
    });

    return {
        athletes,
        athletesPending,
        currentAthlete,
        currentAthletePending,
        seasons,
        seasonsPending,
        activities,
        activitiesPending,
    };
});
