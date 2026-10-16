<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';
import type { SelectParentsSerialized } from '~~/lib/db/schema';

import ListActions from '~/components/List/Actions.vue';

const { selectedRows, isLoading } = defineProps<{
    selectedRows?: Row<SelectParentsSerialized>[];
    isLoading: boolean;
}>();

const emit = defineEmits<{
    deleteSuccess: [];
}>();

const parentDeleteFormRef = useTemplateRef('parentDeleteFormRef');

const openDeleteModal = ref(false);

const selectedRowsQuantity = computed(() => selectedRows?.length || 0);

function handleDeleteSuccess() {
    openDeleteModal.value = false;

    emit('deleteSuccess');
}
</script>

<template>
    <ListActions
        v-model:openDelete="openDeleteModal"
        :deleteModal="{
            title: $t('form.parent.multiple_delete.title', {
                quantity: selectedRowsQuantity.toString(),
            }),
            description: $t('form.parent.multiple_delete.description'),
            isDisabled: isLoading || selectedRowsQuantity === 0,
            isLoading: Boolean(parentDeleteFormRef?.isLoading()),
        }"
        @submit="parentDeleteFormRef?.submit()"
    >
        <template #delete>
            <ParentMultipleDeleteForm
                ref="parentDeleteFormRef"
                :parents="selectedRows?.map((row) => row.original) || []"
                @success="handleDeleteSuccess"
            />
        </template>
    </ListActions>
</template>
