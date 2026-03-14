import type { SelectItem } from '@nuxt/ui';

export const useActivitiesStore = defineStore('activity', () => {
    const activityAddInitialState: Partial<ActivityAddSchema> = {
        name: undefined,
    };

    const {
        data: activities,
        pending: activitiesPending,
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

    const {
        showAddForm: showActivityAddForm,
        isAdding: isAddingActivity,
        state: activityAddState,
        add: addActivity,
    } = useAddForm(
        activityAddInitialState,
        refreshActivities,
        '/api/activities/add',
        'Activity added successfully',
    );

    const activityAddFields = computed<FormField<ActivityAddSchema>[]>(() => {
        return [
            {
                renderAs: 'input',
                label: $t('form.field.activity_name.label'),
                name: 'name',
                placeholder: $t('form.field.activity_name.placeholder'),
                required: true,
                variant: 'subtle',
            },
        ];
    });

    return {
        activities,
        activitiesItems,
        activitiesPending,
        addActivity,
        showActivityAddForm,
        isAddingActivity,
        activityAddState,
        activityAddFields,
    };
});
