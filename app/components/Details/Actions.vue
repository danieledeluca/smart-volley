<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

import { useClipboard } from '@vueuse/core';

const { pageId, detailsPath, editModal, deleteModal, additionalItems } = defineProps<{
    pageId?: number;
    detailsPath?: string;
    editModal?: {
        title: string;
        description: string;
        isLoading: boolean;
    };
    deleteModal?: {
        title: string;
        description: string;
        isLoading: boolean;
    };
    additionalItems?: DropdownMenuItem[];
}>();

const emit = defineEmits<{
    delete: [];
    deleteClose: [];
    edit: [];
    editClose: [];
    interactOutside: [event: Event];
}>();

const slots = defineSlots<{
    delete?: (props?: object) => VNode[];
    edit?: (props?: object) => VNode[];
}>();

const openDelete = defineModel<boolean>('openDelete', {
    default: false,
});
const openEdit = defineModel<boolean>('openEdit', {
    default: false,
});

const authStore = useAuthStore();
const toast = useToast();
const { copy } = useClipboard();

const { canEdit } = storeToRefs(authStore);

const dropDownMenuItems = computed(() => {
    const items: DropdownMenuItem[] = [];

    if (pageId) {
        items.push({
            label: $t('action.copy_id.label'),
            icon: 'i-lucide-copy',
            async onSelect() {
                await copy(pageId.toString());

                toast.add({
                    id: pageId,
                    title: $t('toast.copy', { name: $t('action.copy_id.success') }),
                    color: 'success',
                    icon: 'i-lucide-circle-check',
                });
            },
        });
    }

    if (detailsPath) {
        items.push({
            label: $t('action.view_details'),
            icon: 'i-lucide-list',
            to: detailsPath,
        });
    }

    if (additionalItems) {
        items.push(...additionalItems);
    }

    if (canEdit.value && (editModal || deleteModal)) {
        if (items.length > 0) {
            items.push({
                type: 'separator',
            });
        }

        if (editModal) {
            items.push({
                label: $t('action.edit'),
                icon: 'i-lucide-edit',
                color: 'warning',
                onSelect() {
                    openEdit.value = true;
                },
            });
        }

        if (deleteModal) {
            items.push({
                label: $t('action.delete'),
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect() {
                    openDelete.value = true;
                },
            });
        }
    }

    return items;
});
</script>

<template>
    <BaseActions :dropDownMenuItems>
        <template v-if="canEdit">
            <AppModal
                v-if="!!slots.delete && deleteModal"
                v-model:open="openDelete"
                :title="deleteModal.title"
                :description="deleteModal.description"
                :submitButtonProps="{
                    color: 'error',
                    label: $t('form.button.delete'),
                    loading: deleteModal.isLoading,
                }"
                :showModalBody="false"
                @submit="emit('delete')"
                @close="emit('deleteClose')"
            >
                <slot name="delete" />
            </AppModal>
            <AppSlideover
                v-if="!!slots.edit && editModal"
                v-model:open="openEdit"
                :title="editModal.title"
                :description="editModal.description"
                :submitButtonProps="{
                    label: $t('form.button.edit'),
                    loading: editModal.isLoading,
                }"
                @submit="emit('edit')"
                @close="emit('editClose')"
                @interactOutside="emit('interactOutside', $event)"
            >
                <slot name="edit" />
            </AppSlideover>
        </template>
    </BaseActions>
</template>
