import type { RadioGroupItem } from '@nuxt/ui';

export const useActivitiesStore = defineStore('activities', () => {
    const {
        data: activities,
        pending: activitiesPending,
        error: activitiesError,
        refresh: refreshActivities,
    } = useLazyFetch('/api/activities');

    const activitiesItems = computed(() => {
        return activities.value?.map<RadioGroupItem>((activity) => {
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
