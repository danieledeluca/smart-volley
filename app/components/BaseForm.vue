<script setup lang="ts" generic="T extends z.ZodType">
import type { FormError, FormSubmitEvent, InferInput, InferOutput } from '@nuxt/ui';
import type { FetchError } from 'ofetch';
import type z from 'zod';

type FormDataInput = InferInput<T>;
type FormDataOutput = InferOutput<T>;

const { schema, onSubmit, onSubmitComplete, submitButtonLabel, successMessage } = defineProps<{
    schema?: T;
    onSubmit: (event: FormSubmitEvent<FormDataOutput>) => Promise<any>;
    onSubmitComplete?: () => void;
    submitButtonLabel: string;
    successMessage: string;
}>();

const state = defineModel<Partial<FormDataInput>>('state');

const toast = useToast();
const formRef = useTemplateRef('formRef');

const isLoading = ref(false);
const formErrors = ref<FormError[]>([]);

async function handleSubmit(event: FormSubmitEvent<FormDataOutput>) {
    try {
        isLoading.value = true;

        await onSubmit(event);

        toast.add({
            description: successMessage,
            color: 'success',
            icon: 'i-lucide-circle-check',
        });

        onSubmitComplete?.();
    } catch (err) {
        const error = err as FetchError;

        if (error.data?.data) {
            formErrors.value = error.data?.data;
        } else {
            toast.add({
                description: error.statusMessage || DEFAULT_SERVER_ERROR_MESSAGE,
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        }
    } finally {
        isLoading.value = false;
    }
}

watch(formErrors, (newErrors) => {
    formRef.value?.setErrors(newErrors);
});

defineExpose({
    submit: () => formRef.value?.submit(),
    isLoading,
});
</script>

<template>
    <UForm
        ref="formRef"
        :schema
        :state
        class="grid gap-8"
        autocomplete="off"
        @submit="handleSubmit"
    >
        <slot />
        <UButton
            type="submit"
            :label="submitButtonLabel"
            :loading="isLoading"
            class="hidden"
            block
        />
    </UForm>
</template>
