<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

import { InsertEnrollment } from '~~/lib/db/schema';

const { enrollmentId } = defineProps<{
    enrollmentId: number;
}>();

const emit = defineEmits<{
    success: [];
}>();

const { data: enrollment, pending, error } = useLazyFetch(`/api/enrollments/${enrollmentId}`);

const enrollmentsStore = useEnrollmentsStore();
const { $csrfFetch } = useNuxtApp();
const enrollmentFormRef = useTemplateRef('enrollmentFormRef');
const { initialState } = useForm('enrollment');

const state = ref({ ...initialState });

async function onSubmit(event: FormSubmitEvent<InsertEnrollment>) {
    await $csrfFetch(`/api/enrollments/${enrollmentId}`, {
        method: 'PUT',
        body: event.data,
    });
}

function onSubmitComplete() {
    enrollmentsStore.refreshEnrollments();

    emit('success');
}

watchEffect(() => {
    if (enrollment.value) {
        state.value = {
            athleteId: enrollment.value.athleteId,
            seasonId: enrollment.value.seasonId,
            activityId: enrollment.value.activityId,
            courseId: enrollment.value.courseId,
            volleyAccount: enrollment.value.volleyAccount ?? undefined,
            volleyBalance: enrollment.value.volleyBalance ?? undefined,
            volleyBalanceSecondary: enrollment.value.volleyBalanceSecondary ?? undefined,
            firstInstallment: enrollment.value.firstInstallment ?? undefined,
            secondInstallment: enrollment.value.secondInstallment ?? undefined,
            thirdInstallment: enrollment.value.thirdInstallment ?? undefined,
            certificateExpirationDate: enrollment.value.certificateExpirationDate ?? undefined,
            certificateStorageKey: undefined,
        };
    }
});

defineExpose({
    submit: () => enrollmentFormRef.value?.submit(),
    isLoading: () => enrollmentFormRef.value?.isLoading,
});
</script>

<template>
    <USkeleton v-if="pending" class="h-full" />
    <UAlert
        v-else-if="error"
        :title="error.statusMessage"
        color="error"
        icon="i-lucide-circle-x"
    />
    <BaseForm
        v-if="enrollment"
        ref="enrollmentFormRef"
        v-model:state="state"
        :schema="InsertEnrollment"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.edit')"
        :successMessage="$t('form.enrollment.edit.success')"
    >
        <EnrollmentFields v-model:state="state" />
    </BaseForm>
</template>
