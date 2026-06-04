<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const { deleteTitle, deleteDescription, editTitle, editDescription, isLoading } = defineProps<{
    deleteTitle: string;
    deleteDescription?: string;
    editTitle: string;
    editDescription?: string;
    isLoading: boolean;
}>();

const emit = defineEmits<{
    delete: [];
    edit: [];
}>();

const openDelete = defineModel<boolean>('openDelete', {
    default: false,
});
const openEdit = defineModel<boolean>('openEdit', {
    default: false,
});

const dropDownItems: DropdownMenuItem[] = [
    {
        label: $t('form.button.edit'),
        icon: 'i-lucide-edit',
        color: 'warning',
        onSelect() {
            openEdit.value = true;
        },
    },
    {
        label: $t('form.button.delete'),
        icon: 'i-lucide-trash',
        color: 'error',
        onSelect() {
            openDelete.value = true;
        },
    },
];
</script>

<template>
    <UDropdownMenu :items="dropDownItems" :content="{ align: 'end' }">
        <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
        />
    </UDropdownMenu>
    <AppModal
        v-model:open="openDelete"
        :title="deleteTitle"
        :description="deleteDescription"
        :submitButtonProps="{
            color: 'error',
            label: $t('form.button.delete'),
            loading: isLoading,
        }"
        @submit="emit('delete')"
    >
        <slot name="delete" />
    </AppModal>
    <AppSlideover
        v-model:open="openEdit"
        :title="editTitle"
        :description="editDescription"
        :submitButtonProps="{
            label: $t('form.button.edit'),
            loading: isLoading,
        }"
        @submit="emit('edit')"
    >
        <slot name="edit" />
    </AppSlideover>
</template>
