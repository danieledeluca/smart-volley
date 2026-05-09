<script setup lang="ts">
const { title, description, buttonLabel, isLoading } = defineProps<{
    title: string;
    description: string;
    buttonLabel: string;
    isLoading: boolean;
}>();

const emit = defineEmits<{
    submit: [];
}>();
</script>

<template>
    <UModal :title :description>
        <UButton
            :label="buttonLabel"
            variant="soft"
            icon="i-lucide-plus"
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
    </UModal>
</template>
