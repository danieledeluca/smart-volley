<script setup lang="ts">
const { title, description, buttonLabel, buttonIcon, isLoading } = defineProps<{
    title: string;
    description?: string;
    buttonLabel: string;
    buttonIcon: string;
    isLoading: boolean;
}>();

const emit = defineEmits<{
    submit: [];
}>();
</script>

<template>
    <USlideover :title :description>
        <UButton :label="buttonLabel" variant="solid" :icon="buttonIcon" />
        <template #body>
            <slot />
        </template>
        <template #footer="{ close }">
            <UButton
                type="button"
                variant="outline"
                color="neutral"
                :label="$t('form.button.cancel')"
                block
                @click="close"
            />
            <UButton
                type="button"
                :label="$t('form.button.add')"
                :loading="isLoading"
                block
                @click="emit('submit')"
            />
        </template>
    </USlideover>
</template>
