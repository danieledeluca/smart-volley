<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { UpdatedEnrollment } from '~~/lib/db/schema';

import { InsertEnrollment } from '~~/lib/db/schema';
import { FILE_ACCEPTED_TYPES } from '~~/lib/utils/constants';

const { enrollmentId } = defineProps<{
    enrollmentId: number;
}>();

const emit = defineEmits<{
    success: [id?: number];
}>();

const { data: enrollment, pending, error } = useLazyFetch(`/api/enrollments/${enrollmentId}`);

const enrollmentsStore = useEnrollmentsStore();
const { $csrfFetch } = useNuxtApp();
const enrollmentFormRef = useTemplateRef('enrollmentFormRef');
const { initialState } = useForm('enrollment');

const state = ref({ ...initialState });
const updatedEnrollment = ref<UpdatedEnrollment>();

async function onSubmit(event: FormSubmitEvent<InsertEnrollment>) {
    const enrollment = await $csrfFetch<UpdatedEnrollment>(`/api/enrollments/${enrollmentId}`, {
        method: 'PUT',
        body: toFormData(event.data),
    });

    updatedEnrollment.value = enrollment;
}

function onSubmitComplete() {
    enrollmentsStore.refreshEnrollments();

    emit('success', updatedEnrollment.value?.id);
}

watchEffect(() => {
    if (enrollment.value) {
        state.value = {
            athleteId: enrollment.value.athleteId,
            seasonId: enrollment.value.seasonId,
            courseId: enrollment.value.courseId,
            volleyAccount: enrollment.value.volleyAccount ?? undefined,
            volleyAccountDate: enrollment.value.volleyAccountDate ?? undefined,
            volleyAccountType: enrollment.value.volleyAccountType ?? undefined,
            volleyBalance: enrollment.value.volleyBalance ?? undefined,
            volleySecondBalance: enrollment.value.volleySecondBalance ?? undefined,
            gymnasticsFirstInstallment: enrollment.value.gymnasticsFirstInstallment ?? undefined,
            gymnasticsFirstInstallmentDate: enrollment.value.gymnasticsFirstInstallmentDate ?? undefined,
            gymnasticsFirstInstallmentType: enrollment.value.gymnasticsFirstInstallmentType ?? undefined,
            gymnasticsSecondInstallment: enrollment.value.gymnasticsSecondInstallment ?? undefined,
            gymnasticsSecondInstallmentDate: enrollment.value.gymnasticsSecondInstallmentDate ?? undefined,
            gymnasticsSecondInstallmentType: enrollment.value.gymnasticsSecondInstallmentType ?? undefined,
            gymnasticsThirdInstallment: enrollment.value.gymnasticsThirdInstallment ?? undefined,
            gymnasticsThirdInstallmentDate: enrollment.value.gymnasticsThirdInstallmentDate ?? undefined,
            gymnasticsThirdInstallmentType: enrollment.value.gymnasticsThirdInstallmentType ?? undefined,
            certificateExpirationDate: enrollment.value.certificateExpirationDate ?? undefined,
            certificateStorageKey: enrollment.value.certificateFile
                ? new File([], '', { type: FILE_ACCEPTED_TYPES[0] })
                : undefined,
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
