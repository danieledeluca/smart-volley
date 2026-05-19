import type { FormError, FormSubmitEvent, SelectMenuItem } from '@nuxt/ui';
import type { InsertActivity } from '~~/lib/db/schema';
import type { FetchError } from 'ofetch';

export const useActivitiesStore = defineStore('activities', () => {
    const { $csrfFetch } = useNuxtApp();
    const toast = useToast();

    const isLoading = ref(false);
    const addingActivityErrors = ref<FormError[]>([]);

    const activityAddInitialState: Partial<InsertActivity> = {
        name: undefined,
    };

    const activityAddState = reactive({ ...activityAddInitialState });

    const {
        data: activities,
        pending: activitiesPending,
        error: activitiesError,
        refresh: refreshActivities,
    } = useLazyFetch('/api/activities', {
        headers: useRequestHeaders(['cookie']),
    });

    const activitiesItems = computed(() => {
        return activities.value?.map<SelectMenuItem>((activity) => {
            return {
                label: activity.name,
                value: activity.id,
            };
        });
    });

    const clearActivityAddForm = () => {
        Object.assign(activityAddState, activityAddInitialState);

        refreshActivities();
    };

    const addActivity = async (event: FormSubmitEvent<InsertActivity>) => {
        try {
            isLoading.value = true;

            await $csrfFetch('/api/activities', {
                method: 'POST',
                body: event.data,
            });

            clearActivityAddForm();

            toast.add({
                description: $t('form.add_activity.success'),
                color: 'success',
                icon: 'i-lucide-circle-check',
            });
        } catch (err) {
            const error = err as FetchError;

            if (error.data?.data) {
                addingActivityErrors.value = error.data?.data;
            } else {
                toast.add({
                    description: error.statusMessage || DEFAULT_SERVER_ERROR_MESSAGE,
                    color: 'error',
                    icon: 'i-lucide-circle-x',
                });
            }
        } finally {
            isLoading.value = false;
        }
    };

    const activityAddFields = computed<FormField<InsertActivity>[]>(() => {
        return [
            {
                renderAs: 'input',
                formFieldProps: {
                    label: $t('form.field.activity_name.label'),
                    name: 'name',
                    required: true,
                },
                inputProps: {
                    placeholder: $t('form.field.activity_name.placeholder'),
                },
            },
        ];
    });

    return {
        isLoading,
        addingActivityErrors,
        activities,
        activitiesItems,
        activitiesPending,
        activitiesError,
        activityAddState,
        activityAddFields,
        refreshActivities,
        addActivity,
    };
});
