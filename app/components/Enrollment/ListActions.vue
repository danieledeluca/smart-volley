<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';
import type { SelectEnrollmentsWithRelations } from '~~/lib/db/schema';
import type { FetchError } from 'ofetch';

import Actions from '~/components/List/Actions.vue';

const { selectedRows, isLoading } = defineProps<{
    selectedRows?: Row<SelectEnrollmentsWithRelations>[];
    isLoading: boolean;
}>();

const emit = defineEmits<{
    deleteSuccess: [];
}>();

const toast = useToast();
const { $csrfFetch } = useNuxtApp();
const enrollmentsStore = useEnrollmentsStore();

const openDelete = ref(false);
const isDeleting = ref(false);
const isDownloading = ref(false);

const selectedRowsQuantity = computed(() => selectedRows?.length || 0);

async function handleDelete() {
    try {
        isDeleting.value = true;

        await $csrfFetch('/api/enrollments', {
            method: 'DELETE',
            body: {
                ids: selectedRows?.map((row) => row.original.id),
            },
        });

        toast.add({
            description: $t('form.enrollment.multiple_delete.success'),
            color: 'success',
            icon: 'i-lucide-circle-check',
        });

        enrollmentsStore.refreshEnrollments();

        openDelete.value = false;

        emit('deleteSuccess');
    } catch (error) {
        toast.add({
            description: getFetchErrorMessage(error as FetchError),
            color: 'error',
            icon: 'i-lucide-circle-x',
        });
    } finally {
        isDeleting.value = false;
    }
}

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
            description: getFetchErrorMessage(error as FetchError),
            color: 'error',
            icon: 'i-lucide-circle-x',
        });
    } finally {
        isDownloading.value = false;
    }
}
</script>

<template>
    <Actions
        v-model:openDelete="openDelete"
        :deleteModal="{
            title: $t('form.enrollment.multiple_delete.title', {
                quantity: selectedRowsQuantity.toString(),
            }),
            description: $t('form.enrollment.multiple_delete.description'),
            isDisabled: selectedRowsQuantity === 0,
            isLoading: isLoading || isDeleting,
        }"
        :additionalItems="[
            {
                label: $t('action.download_csv'),
                icon: 'i-lucide-file-spreadsheet',
                disabled: isLoading || isDownloading || selectedRowsQuantity === 0,
                loading: isLoading || isDownloading,
                onSelect: handleCsvDownload,
            },
        ]"
        @delete="handleDelete"
    />
</template>
