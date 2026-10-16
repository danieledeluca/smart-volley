<script setup lang="ts">
import type { SelectEnrollmentsSerialized } from '~~/lib/db/schema';

const { enrollments } = defineProps<{
    enrollments: SelectEnrollmentsSerialized[];
}>();

const emit = defineEmits<{
    success: [];
}>();

const enrollmentsStore = useEnrollmentsStore();
const { $csrfFetch } = useNuxtApp();
const enrollmentFormRef = useTemplateRef('enrollmentFormRef');

async function onSubmit() {
    await $csrfFetch(`/api/enrollments`, {
        method: 'DELETE',
        body: {
            ids: enrollments.map((enrollment) => enrollment.id),
        },
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
        :successMessage="$t('form.enrollment.multiple_delete.success')"
    />
</template>
