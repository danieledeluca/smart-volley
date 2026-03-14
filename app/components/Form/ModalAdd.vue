<script setup lang="ts">
const { title, description, buttonLabel, formRef } = defineProps<{
    title: string;
    description?: string;
    buttonLabel: string;
    formRef: FormAddInstance[] | null;
}>();

const showForm = defineModel<boolean>('open', {
    required: true,
});

const isAdding = defineModel<boolean>('adding', {
    required: true,
});
</script>

<template>
    <UModal v-model:open="showForm" :title :description>
        <UButton
            :label="buttonLabel"
            variant="soft"
            icon="i-lucide-plus"
            block
        />
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
                @click="formRef?.[0]?.submit"
            />
        </template>
    </UModal>
</template>
