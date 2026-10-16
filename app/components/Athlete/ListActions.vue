<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';
import type { SelectAthletesSerialized } from '~~/lib/db/schema';

import ListActions from '~/components/List/Actions.vue';

const { selectedRows, isLoading } = defineProps<{
    selectedRows?: Row<SelectAthletesSerialized>[];
    isLoading: boolean;
}>();

const emit = defineEmits<{
    deleteSuccess: [];
}>();

const athleteDeleteFormRef = useTemplateRef('athleteDeleteFormRef');

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
            title: $t('form.athlete.multiple_delete.title', {
                quantity: selectedRowsQuantity.toString(),
            }),
            description: $t('form.athlete.multiple_delete.description'),
            isDisabled: isLoading || selectedRowsQuantity === 0,
            isLoading: Boolean(athleteDeleteFormRef?.isLoading()),
        }"
        @submit="athleteDeleteFormRef?.submit()"
    >
        <template #delete>
            <AthleteMultipleDeleteForm
                ref="athleteDeleteFormRef"
                :athletes="selectedRows?.map((row) => row.original) || []"
                @success="handleDeleteSuccess"
            />
        </template>
    </ListActions>
</template>
