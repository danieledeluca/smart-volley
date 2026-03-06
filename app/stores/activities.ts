import type { SelectItem } from '@nuxt/ui';

export const useActivitiesStore = defineStore('activities', () => {
    const { data: activities, pending: activitiesPending } = useLazyFetch('/api/activities', {
        headers: useRequestHeaders(['cookie']),
        transform: (activities) => {
            return activities.map<SelectItem>((activity) => {
                return {
                    label: activity.name,
                    value: activity.id,
                };
            });
        },
    });

    return {
        activities,
        activitiesPending,
    };
});
