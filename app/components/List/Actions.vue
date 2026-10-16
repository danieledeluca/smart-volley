<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const { deleteModal, additionalItems } = defineProps<{
    deleteModal?: {
        title: string;
        description: string;
        isDisabled: boolean;
        isLoading?: boolean;
    };
    additionalItems?: DropdownMenuItem[];
}>();

const emit = defineEmits<{
    submit: [];
}>();

const slots = defineSlots<{
    delete?: (props?: object) => VNode[];
}>();

const openDelete = defineModel<boolean>('openDelete', {
    default: false,
});

const authStore = useAuthStore();

const { canEdit } = storeToRefs(authStore);

const dropDownMenuItems = computed(() => {
    const items: DropdownMenuItem[] = [];

    if (additionalItems) {
        items.push(...additionalItems);
    }

    if (canEdit.value && deleteModal) {
        if (items.length > 0) {
            items.push({
                type: 'separator',
            });
        }

        items.push({
            label: $t('action.delete'),
            icon: 'i-lucide-trash',
            color: 'error',
            disabled: deleteModal.isDisabled,
            loading: deleteModal.isLoading,
            onSelect() {
                openDelete.value = true;
            },
        });
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
                @submit="emit('submit')"
            >
                <slot name="delete" />
            </AppModal>
        </template>
    </BaseActions>
</template>
