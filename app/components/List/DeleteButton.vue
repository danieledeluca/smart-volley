<script setup lang="ts">
const { title, description, isDisabled, isLoading } = defineProps<{
    title: string;
    description: string;
    isDisabled: boolean;
    isLoading?: boolean;
}>();

const emit = defineEmits<{
    submit: [];
}>();

const open = defineModel<boolean>('open', {
    default: false,
});
</script>

<template>
    <AppModal
        v-model:open="open"
        :title
        :description
        :submitButtonProps="{
            color: 'error',
            label: $t('form.button.delete'),
            loading: isLoading,
        }"
        @submit="emit('submit')"
    >
        <template #button>
            <UTooltip :text="$t('form.tooltip.delete')" :disabled="!isDisabled">
                <UButton
                    variant="subtle"
                    color="error"
                    :label="$t('form.button.delete')"
                    icon="i-lucide-trash"
                    :disabled="isDisabled"
                />
            </UTooltip>
        </template>
        <slot />
    </AppModal>
</template>
