<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const { title, description, buttonProps, cancelButtonProps, submitButtonProps } = defineProps<{
    title: string;
    description?: string;
    buttonProps?: ButtonProps;
    cancelButtonProps?: Omit<ButtonProps, 'variant' | 'color'>;
    submitButtonProps?: ButtonProps;
}>();

const emit = defineEmits<{
    submit: [];
    cancel: [];
    close: [];
}>();

const open = defineModel<boolean>('open', {
    default: false,
});

function handleCancel() {
    open.value = false;

    emit('cancel');
}
</script>

<template>
    <UModal
        v-model:open="open"
        :title
        :description
        @after:leave="emit('close')"
    >
        <slot name="button">
            <UButton v-if="buttonProps?.label || buttonProps?.icon" v-bind="buttonProps" />
        </slot>
        <template #body>
            <slot />
        </template>
        <template #footer>
            <UButton
                v-bind="cancelButtonProps"
                variant="outline"
                color="neutral"
                :label="cancelButtonProps?.label || $t('form.button.cancel')"
                @click="handleCancel"
            />
            <UButton
                v-if="submitButtonProps?.label || submitButtonProps?.icon"
                v-bind="submitButtonProps"
                @click="emit('submit')"
            />
        </template>
    </UModal>
</template>
