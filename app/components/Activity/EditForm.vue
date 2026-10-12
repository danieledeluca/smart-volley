<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { UpdatedActivity } from '~~/lib/db/schema';

import { InsertActivity } from '~~/lib/db/schema';
import { ACTIVITY_ICON_PREFIX } from '~~/lib/utils/constants';

const { activityId } = defineProps<{
    activityId: number;
}>();

const emit = defineEmits<{
    success: [id?: number];
}>();

const { data: activity, pending, error } = useLazyFetch(`/api/activities/${activityId}`);

const activitiesStore = useActivitiesStore();
const dashboardStore = useDashboardStore();
const { $csrfFetch } = useNuxtApp();
const activityFormRef = useTemplateRef('activityFormRef');
const { initialState } = useForm('activity');

const state = ref({ ...initialState });
const updatedActivity = ref<UpdatedActivity>();

async function onSubmit(event: FormSubmitEvent<InsertActivity>) {
    const activity = await $csrfFetch<UpdatedActivity>(`/api/activities/${activityId}`, {
        method: 'PUT',
        body: event.data,
    });

    updatedActivity.value = activity;
}

function onSubmitComplete() {
    activitiesStore.refreshActivities();
    dashboardStore.refreshStats();

    emit('success', updatedActivity.value?.id);
}

watchEffect(() => {
    if (activity.value) {
        state.value = {
            name: activity.value.name,
            icon: activity.value.icon.replace(ACTIVITY_ICON_PREFIX, ''),
        };
    }
});

defineExpose({
    submit: () => activityFormRef.value?.submit(),
    isLoading: () => activityFormRef.value?.isLoading,
});
</script>

<template>
    <ActivityFieldsLoader v-if="pending" />
    <UAlert
        v-else-if="error"
        :title="getApiError(error)"
        color="error"
        icon="i-lucide-circle-x"
    />
    <BaseForm
        v-else-if="activity"
        ref="activityFormRef"
        v-model:state="state"
        :schema="InsertActivity"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.edit')"
        :successMessage="$t('form.activity.edit.success')"
    >
        <ActivityFields v-model:state="state" formAction="edit" />
    </BaseForm>
</template>
