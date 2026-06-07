import type { SelectItem } from '@nuxt/ui';

export const useActivitiesStore = defineStore('activities', () => {
    const {
        data: activities,
        pending: activitiesPending,
        error: activitiesError,
        refresh: refreshActivities,
    } = useLazyFetch('/api/activities', {
        headers: useRequestHeaders(['cookie']),
    });

    const activitiesItems = computed(() => {
        return activities.value?.map<SelectItem>((activity) => {
            return {
                label: activity.name,
                value: activity.id,
            };
        });
    });

    return {
        activities,
        activitiesItems,
        activitiesPending,
        activitiesError,
        refreshActivities,
    };
});
