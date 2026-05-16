<script setup lang="ts" generic="T">
import type { TableColumn, TableRow } from '@nuxt/ui';
import type { PaginationState } from '@tanstack/vue-table';
import type { FetchError } from 'ofetch';

import { getPaginationRowModel } from '@tanstack/vue-table';

const {
    tableData,
    tableColumns,
    isLoading,
    error,
    onSelect,
} = defineProps<{
    tableData?: T[];
    tableColumns?: TableColumn<T>[];
    isLoading?: boolean;
    error?: FetchError;
    onSelect?: (event: Event, row: TableRow<T>) => void;
}> ();

const tableRef = useTemplateRef('tableRef');

const pagination = ref<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
});

const currentPage = computed(() => {
    return {
        start: (tableData?.length || 0) > 0 ? pagination.value.pageIndex * pagination.value.pageSize + 1 : 0,
        end: Math.min(
            pagination.value.pageIndex * pagination.value.pageSize + pagination.value.pageSize,
            tableData?.length || 0,
        ),
    };
});

watch(() => tableData, () => {
    pagination.value.pageIndex = 0;
});
</script>

<template>
    <div class="not-empty:mt-6 sm:not-empty:mt-8">
        <USkeleton v-if="isLoading && !tableData" class="h-116.75" />
        <UAlert
            v-if="error"
            :title="error.statusMessage"
            color="error"
            icon="i-lucide-circle-x"
        />
        <template v-else-if="tableData">
            <UTable
                ref="tableRef"
                v-model:pagination="pagination"
                class="striped-table rounded-md border border-accented has-[+*]:rounded-b-none"
                :data="tableData"
                :columns="tableColumns"
                :paginationOptions="{ getPaginationRowModel: getPaginationRowModel() }"
                :loading="isLoading"
                @select="onSelect"
            />
            <div
                v-if="tableData.length > 0"
                class="flex items-center gap-4 rounded-md rounded-t-none border border-t-0 border-accented bg-elevated px-4 py-3.5 max-md:flex-col"
            >
                <div class="text-sm text-muted">
                    {{ $t('table.pagination', {
                        start: currentPage.start.toString(),
                        end: currentPage.end.toString(),
                        total: tableData.length.toString(),
                    }) }}
                </div>
                <UPagination
                    class="md:ml-auto"
                    :page="(tableRef?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                    :itemsPerPage="tableRef?.tableApi?.getState().pagination.pageSize"
                    :total="tableRef?.tableApi?.getFilteredRowModel().rows.length"
                    @update:page="(p) => tableRef?.tableApi?.setPageIndex(p - 1)"
                />
            </div>
        </template>
    </div>
</template>
