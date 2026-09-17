<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

import { useClipboard } from '@vueuse/core';

const { pageId, copy: copyConfig, viewDetails, edit, delete: deleteConfig, isLoading } = defineProps<{
    pageId?: number;
    copy?: {
        label: string;
        successMessage: string;
    };
    viewDetails?: {
        label: string;
        path: string;
    };
    edit: {
        label: string;
        title: string;
        description: string;
    };
    delete: {
        label: string;
        title: string;
        description?: string;
    };
    isLoading?: boolean;
}>();

const emit = defineEmits<{
    delete: [];
    deleteClose: [];
    edit: [];
    editClose: [];
    interactOutside: [event: Event];
}>();

const openDelete = defineModel<boolean>('openDelete', {
    default: false,
});
const openEdit = defineModel<boolean>('openEdit', {
    default: false,
});

const toast = useToast();
const { copy } = useClipboard();

const dropDownItems: DropdownMenuItem[] = [
    {
        type: 'label',
        label: $t('table.action.label'),
    },
];

if (pageId && copyConfig) {
    dropDownItems.push(
        {
            label: copyConfig.label,
            icon: 'i-lucide-copy',
            async onSelect() {
                await copy(pageId.toString());

                toast.add({
                    id: pageId,
                    title: copyConfig.successMessage,
                    color: 'success',
                    icon: 'i-lucide-circle-check',
                });
            },
        },
    );

    if (!viewDetails) {
        dropDownItems.push(
            {
                type: 'separator',
            },
        );
    }
}

if (viewDetails) {
    dropDownItems.push(
        {
            label: viewDetails.label,
            icon: 'i-lucide-list',
            to: viewDetails.path,
        },
        {
            type: 'separator',
        },
    );
}

dropDownItems.push(
    {
        label: edit.label,
        icon: 'i-lucide-edit',
        color: 'warning',
        onSelect() {
            openEdit.value = true;
        },
    },
    {
        label: deleteConfig.label,
        icon: 'i-lucide-trash',
        color: 'error',
        onSelect() {
            openDelete.value = true;
        },
    },
);
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
        :title="deleteConfig.title"
        :description="deleteConfig.description"
        :submitButtonProps="{
            color: 'error',
            label: $t('form.button.delete'),
            loading: isLoading,
        }"
        @submit="emit('delete')"
        @close="emit('deleteClose')"
    >
        <slot name="delete" />
    </AppModal>
    <AppSlideover
        v-model:open="openEdit"
        :title="edit.title"
        :description="edit.description"
        :submitButtonProps="{
            label: $t('form.button.edit'),
            loading: isLoading,
        }"
        @submit="emit('edit')"
        @close="emit('editClose')"
        @interactOutside="(event) => emit('interactOutside', event)"
    >
        <slot name="edit" />
    </AppSlideover>
</template>
