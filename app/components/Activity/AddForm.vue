<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { SelectActivity } from '~~/lib/db/schema';

import { InsertActivity } from '~~/lib/db/schema';

const emit = defineEmits<{
    success: [id?: number];
}>();

const { $csrfFetch } = useNuxtApp();
const activitiesStore = useActivitiesStore();
const activityFormRef = useTemplateRef('activityFormRef');
const { initialState } = useForm('activity');

const state = ref({ ...initialState });
const insertedActivity = ref<SelectActivity>();

async function onSubmit(event: FormSubmitEvent<InsertActivity>) {
    const activity = await $csrfFetch<SelectActivity>('/api/activities', {
        method: 'POST',
        body: event.data,
    });

    insertedActivity.value = activity;
}

function onSubmitSuccess() {
    state.value = { ...initialState };

    activitiesStore.refreshActivities();

    emit('success', insertedActivity.value?.id);
}

defineExpose({
    submit: () => activityFormRef.value?.submit(),
    isLoading: () => activityFormRef.value?.isLoading,
});
</script>

<template>
    <BaseForm
        ref="activityFormRef"
        v-model:state="state"
        :schema="InsertActivity"
        :onSubmit
        :onSubmitSuccess
        :submitButtonLabel="$t('form.button.add')"
        :successMessage="$t('form.activity.add.success')"
    >
        <ActivityFields v-model:state="state" formAction="add" />
    </BaseForm>
</template>
