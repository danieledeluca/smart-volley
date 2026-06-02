<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

import { InsertEnrollment } from '~~/lib/db/schema';

const emit = defineEmits<{
    success: [];
}>();

const enrollmentsStore = useEnrollmentsStore();
const { $csrfFetch } = useNuxtApp();
const enrollmentFormRef = useTemplateRef('enrollmentFormRef');
const { initialState } = useForm('enrollment');

const state = ref({ ...initialState });

async function onSubmit(event: FormSubmitEvent<InsertEnrollment>) {
    await $csrfFetch('/api/enrollments', {
        method: 'POST',
        body: toFormData(event.data),
    });
}

function onSubmitComplete() {
    state.value = { ...initialState };

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
        v-model:state="state"
        :schema="InsertEnrollment"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.add')"
        :successMessage="$t('form.enrollment.add.success')"
    >
        <EnrollmentFields v-model:state="state" />
    </BaseForm>
</template>
