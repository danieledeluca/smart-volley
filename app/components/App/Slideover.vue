<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const { title, description, buttonProps, footerButtonProps, isLoading } = defineProps<{
    title: string;
    description?: string;
    buttonProps?: ButtonProps;
    footerButtonProps?: Omit<ButtonProps, 'loading'>;
    isLoading: boolean;
}>();

const emit = defineEmits<{
    submit: [];
}>();

const open = defineModel<boolean>('open', {
    default: false,
});
</script>

<template>
    <USlideover v-model:open="open" :title :description>
        <UButton v-if="buttonProps?.label || buttonProps?.icon" v-bind="buttonProps" />
        <template #body>
            <slot />
        </template>
        <template #footer="{ close }">
            <UButton
                variant="outline"
                color="neutral"
                :label="$t('form.button.cancel')"
                @click="close()"
            />
            <UButton
                v-if="footerButtonProps?.label || footerButtonProps?.icon"
                v-bind="footerButtonProps"
                :loading="isLoading"
                @click="emit('submit')"
            />
        </template>
    </USlideover>
</template>
