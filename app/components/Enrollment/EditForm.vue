<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { SelectEnrollment } from '~~/lib/db/schema';

import { InsertEnrollment } from '~~/lib/db/schema';
import { FILE_ACCEPTED_TYPES } from '~~/lib/utils/constants';

const { enrollmentId } = defineProps<{
    enrollmentId: number;
}>();

const emit = defineEmits<{
    success: [id?: number];
}>();

const { data: enrollment, pending, error } = useLazyFetch(`/api/enrollments/${enrollmentId}`);

const { $csrfFetch } = useNuxtApp();
const enrollmentsStore = useEnrollmentsStore();
const enrollmentFormRef = useTemplateRef('enrollmentFormRef');
const { initialState } = useForm('enrollment');

const state = ref({ ...initialState });
const updatedEnrollment = ref<SelectEnrollment>();

async function onSubmit(event: FormSubmitEvent<InsertEnrollment>) {
    const enrollment = await $csrfFetch<SelectEnrollment>(`/api/enrollments/${enrollmentId}`, {
        method: 'PUT',
        body: toFormData(event.data),
    });

    updatedEnrollment.value = enrollment;
}

function onSubmitSuccess() {
    enrollmentsStore.refreshEnrollments();

    emit('success', updatedEnrollment.value?.id);
}

watchEffect(() => {
    if (enrollment.value) {
        state.value = {
            athleteId: enrollment.value.athleteId,
            seasonId: enrollment.value.seasonId,
            courseId: enrollment.value.courseId,
            firstPayment: enrollment.value.firstPayment ?? undefined,
            firstPaymentDate: enrollment.value.firstPaymentDate ?? undefined,
            firstPaymentType: enrollment.value.firstPaymentType ?? undefined,
            secondPayment: enrollment.value.secondPayment ?? undefined,
            secondPaymentDate: enrollment.value.secondPaymentDate ?? undefined,
            secondPaymentType: enrollment.value.secondPaymentType ?? undefined,
            thirdPayment: enrollment.value.thirdPayment ?? undefined,
            thirdPaymentDate: enrollment.value.thirdPaymentDate ?? undefined,
            thirdPaymentType: enrollment.value.thirdPaymentType ?? undefined,
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
    <EnrollmentFieldsLoader v-if="pending" />
    <AppError v-else-if="error" :error />
    <BaseForm
        v-else-if="enrollment"
        ref="enrollmentFormRef"
        v-model:state="state"
        :schema="InsertEnrollment"
        :onSubmit
        :onSubmitSuccess
        :submitButtonLabel="$t('form.button.edit')"
        :successMessage="$t('form.enrollment.edit.success')"
    >
        <EnrollmentFields v-model:state="state" formAction="edit" />
    </BaseForm>
</template>
