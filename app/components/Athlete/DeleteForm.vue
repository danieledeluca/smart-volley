<script setup lang="ts">
const { athleteId } = defineProps<{
    athleteId: number;
}>();

const emit = defineEmits<{
    success: [];
}>();

const athletesStore = useAthletesStore();
const enrollmentsStore = useEnrollmentsStore();
const { $csrfFetch } = useNuxtApp();
const athleteFormRef = useTemplateRef('athleteFormRef');

async function onSubmit() {
    await $csrfFetch(`/api/athletes/${athleteId}`, {
        method: 'DELETE',
    });
}

function onSubmitComplete() {
    athletesStore.refreshAthletes();
    enrollmentsStore.refreshEnrollments();

    emit('success');
}

defineExpose({
    submit: () => athleteFormRef.value?.submit(),
    isLoading: () => athleteFormRef.value?.isLoading,
});
</script>

<template>
    <BaseForm
        ref="athleteFormRef"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.delete')"
        :successMessage="$t('form.athlete.delete.success')"
    >
        <div>{{ $t('form.athlete.delete.body') }}</div>
    </BaseForm>
</template>
