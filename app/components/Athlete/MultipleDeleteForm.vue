<script setup lang="ts">
import type { SelectAthletesSerialized } from '~~/lib/db/schema';

const { athletes } = defineProps<{
    athletes: SelectAthletesSerialized[];
}>();

const emit = defineEmits<{
    success: [];
}>();

const athletesStore = useAthletesStore();
const enrollmentsStore = useEnrollmentsStore();
const { $csrfFetch } = useNuxtApp();
const athleteFormRef = useTemplateRef('athleteFormRef');

async function onSubmit() {
    await $csrfFetch(`/api/athletes`, {
        method: 'DELETE',
        body: {
            ids: athletes.map((athlete) => athlete.id),
        },
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
        :successMessage="$t('form.athlete.multiple_delete.success')"
    />
</template>
