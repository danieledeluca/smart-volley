<script setup lang="ts">
const { title, description, buttonLabel, buttonIcon, formRef } = defineProps<{
    title: string;
    description?: string;
    buttonLabel: string;
    buttonIcon: string;
    formRef: FormAddInstance;
}>();

const showForm = defineModel<boolean>('open', {
    required: true,
});

const isAdding = defineModel<boolean>('adding', {
    required: true,
});
</script>

<template>
    <USlideover v-model:open="showForm" :title :description>
        <UButton :label="buttonLabel" variant="solid" :icon="buttonIcon" />
        <template #body>
            <slot />
        </template>
        <template #footer>
            <UButton
                type="button"
                variant="outline"
                color="neutral"
                :label="$t('form.button.cancel')"
                block
                @click="showForm = false"
            />
            <UButton
                type="button"
                :label="$t('form.button.add')"
                :loading="isAdding"
                block
                @click="formRef?.submit"
            />
        </template>
    </USlideover>
</template>
