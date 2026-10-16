<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';
import type { SelectEnrollmentsSerialized } from '~~/lib/db/schema';
import type { FetchError } from 'ofetch';

import ListActions from '~/components/List/Actions.vue';

const { selectedRows, isLoading } = defineProps<{
    selectedRows?: Row<SelectEnrollmentsSerialized>[];
    isLoading: boolean;
}>();

const emit = defineEmits<{
    deleteSuccess: [];
}>();

const toast = useToast();
const enrollmentDeleteFormRef = useTemplateRef('enrollmentDeleteFormRef');

const openDeleteModal = ref(false);
const isDownloading = ref(false);

const selectedRowsQuantity = computed(() => selectedRows?.length || 0);

async function handleCsvDownload() {
    isDownloading.value = true;

    try {
        await downloadCsv(selectedRows?.map((row) => row.original.id));

        toast.add({
            description: $t('form.enrollment.download_csv.success'),
            color: 'success',
            icon: 'i-lucide-circle-check',
        });
    } catch (error) {
        toast.add({
            description: getApiError(error as FetchError),
            color: 'error',
            icon: 'i-lucide-circle-x',
        });
    } finally {
        isDownloading.value = false;
    }
}

function handleDeleteSuccess() {
    openDeleteModal.value = false;

    emit('deleteSuccess');
}
</script>

<template>
    <ListActions
        v-model:openDelete="openDeleteModal"
        :deleteModal="{
            title: $t('form.enrollment.multiple_delete.title', {
                quantity: selectedRowsQuantity.toString(),
            }),
            description: $t('form.enrollment.multiple_delete.description'),
            isDisabled: isLoading || selectedRowsQuantity === 0,
        }"
        :additionalItems="[
            {
                label: $t('action.download_csv'),
                icon: 'i-lucide-file-spreadsheet',
                disabled: isLoading || isDownloading || selectedRowsQuantity === 0,
                loading: isDownloading,
                onSelect: handleCsvDownload,
            },
        ]"
        @submit="enrollmentDeleteFormRef?.submit()"
    >
        <template #delete>
            <EnrollmentMultipleDeleteForm
                ref="enrollmentDeleteFormRef"
                :enrollments="selectedRows?.map((row) => row.original) || []"
                @success="handleDeleteSuccess"
            />
        </template>
    </ListActions>
</template>
