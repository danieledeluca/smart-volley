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
}>();

const slots = defineSlots<{
    default: () => VNode[];
    button: () => VNode[];
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
    <USlideover v-model:open="open" :title :description>
        <slot v-if="!!slots.button" name="button" />
        <UButton v-else-if="buttonProps?.label || buttonProps?.icon" v-bind="buttonProps" />
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
    </USlideover>
</template>
