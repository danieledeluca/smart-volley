<script setup lang="ts">
const { enrollmentId } = defineProps<{
    enrollmentId: number;
}>();

const emit = defineEmits<{
    success: [];
}>();

const enrollmentsStore = useEnrollmentsStore();
const { $csrfFetch } = useNuxtApp();
const enrollmentFormRef = useTemplateRef('enrollmentFormRef');

async function onSubmit() {
    await $csrfFetch(`/api/enrollments/${enrollmentId}`, {
        method: 'DELETE',
    });
}

function onSubmitComplete() {
    enrollmentsStore.refreshEnrollments();

    emit('success');
}

defineExpose({
    submit: () => enrollmentFormRef.value?.submit(),
    isLoading: () => enrollmentFormRef.value?.isLoading,
});
</script>

<template>
    <BaseForm
        ref="enrollmentFormRef"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.delete')"
        :successMessage="$t('form.enrollment.delete.success')"
    >
        <div>{{ $t('form.enrollment.delete.body') }}</div>
    </BaseForm>
</template>
