<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { UpdatedActivity } from '~~/lib/db/schema';

import { InsertActivity } from '~~/lib/db/schema';

const { activityId } = defineProps<{
    activityId: number;
}>();

const emit = defineEmits<{
    success: [id?: number];
}>();

const { data: activity, pending, error } = useLazyFetch(`/api/activities/${activityId}`);

const activitiesStore = useActivitiesStore();
const { $csrfFetch } = useNuxtApp();
const activityFormRef = useTemplateRef('activityFormRef');
const { initialState } = useForm('activity');

const state = ref({ ...initialState });
const updatedSeason = ref<UpdatedActivity>();

async function onSubmit(event: FormSubmitEvent<InsertActivity>) {
    const activity = await $csrfFetch<UpdatedActivity>(`/api/activities/${activityId}`, {
        method: 'PUT',
        body: event.data,
    });

    updatedSeason.value = activity;
}

function onSubmitComplete() {
    activitiesStore.refreshActivities();

    emit('success', updatedSeason.value?.id);
}

watchEffect(() => {
    if (activity.value) {
        state.value = {
            name: activity.value.name,
            key: activity.value.key,
        };
    }
});

defineExpose({
    submit: () => activityFormRef.value?.submit(),
    isLoading: () => activityFormRef.value?.isLoading,
});
</script>

<template>
    <ActivityEditFormLoader v-if="pending" />
    <UAlert
        v-else-if="error"
        :title="error.statusMessage"
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
        <ActivityFields v-model:state="state" />
    </BaseForm>
</template>
