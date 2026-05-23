<script setup lang="ts">
const { title, description, buttonLabel, buttonIcon, footerButtonLabel, isLoading } = defineProps<{
    title: string;
    description?: string;
    buttonLabel?: string;
    buttonIcon?: string;
    footerButtonLabel: string;
    isLoading: boolean;
}>();

const emit = defineEmits<{
    submit: [];
}>();

const open = defineModel<boolean>('open', { default: false });
</script>

<template>
    <USlideover v-model:open="open" :title :description>
        <UButton
            v-if="buttonLabel || buttonIcon"
            :label="buttonLabel"
            variant="solid"
            :icon="buttonIcon"
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
                @click="close()"
            />
            <UButton
                type="button"
                :label="footerButtonLabel"
                :loading="isLoading"
                @click="emit('submit')"
            />
        </template>
    </USlideover>
</template>
