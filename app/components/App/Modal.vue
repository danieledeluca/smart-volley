<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const { title, description, buttonLabel, buttonIcon, footerButtonLabel, footerButtonColor, isLoading } = defineProps<{
    title: string;
    description?: string;
    buttonLabel?: string;
    buttonIcon?: string;
    footerButtonLabel: string;
    footerButtonColor?: ButtonProps['color'];
    isLoading: boolean;
}>();

const emit = defineEmits<{
    submit: [];
}>();

const open = defineModel<boolean>('open', { default: false });
</script>

<template>
    <UModal v-model:open="open" :title :description>
        <UButton
            v-if="buttonLabel || buttonIcon"
            :label="buttonLabel"
            variant="soft"
            :icon="buttonIcon"
            block
        />
        <template #body>
            <slot />
        </template>
        <template #footer="{ close }">
            <UButton
                type="button"
                variant="outline"
                color="neutral"
                :label="$t('form.button.cancel')"
                @click="close"
            />
            <UButton
                type="button"
                :label="footerButtonLabel"
                :color="footerButtonColor"
                :loading="isLoading"
                @click="emit('submit')"
            />
        </template>
    </UModal>
</template>
