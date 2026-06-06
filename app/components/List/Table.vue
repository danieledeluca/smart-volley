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
    showPagination = false,
    onSelect,
} = defineProps<{
    tableData?: T[];
    tableColumns?: TableColumn<T>[];
    isLoading?: boolean;
    error?: FetchError;
    showPagination?: boolean;
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

const hasSelectColumn = computed(() => Boolean(tableColumns?.find((column) => column.id === 'select')));

watch(() => tableData, () => {
    pagination.value.pageIndex = 0;
});

defineExpose({
    selectRows: () => tableRef.value?.tableApi.getFilteredSelectedRowModel().rows,
    toggleAllPageRowsSelected: (value?: boolean) => tableRef.value?.tableApi.toggleAllPageRowsSelected(value),
});
</script>

<template>
    <div class="mt-4 h-full max-h-(--ui-table-max-height) sm:mt-6">
        <USkeleton v-if="isLoading && !tableData" class="h-full" />
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
                class="striped-table max-h-full rounded-md border border-accented"
                :class="{
                    'rounded-b-none': showPagination || hasSelectColumn,
                    'max-h-[calc(100%-var(--ui-table-footer-pagination-height))]': showPagination,
                    'max-h-[calc(100%-var(--ui-table-footer-selection-height))]': !showPagination && hasSelectColumn,
                }"
                :data="tableData"
                :columns="tableColumns"
                :paginationOptions="showPagination ? { getPaginationRowModel: getPaginationRowModel() } : undefined"
                :loading="isLoading"
                :sticky="!showPagination"
                :virtualize="!showPagination"
                @select="(_event, row) => hasSelectColumn
                    ? row.toggleSelected(!row.getIsSelected()) : onSelect?.(_event, row)"
            />
            <template v-if="tableData.length > 0 && (showPagination || hasSelectColumn)">
                <div class="flex items-center gap-4 rounded-md rounded-t-none border border-t-0 border-accented bg-elevated px-4 py-3.5 max-md:flex-col">
                    <div class="text-sm text-muted">
                        <template v-if="showPagination">
                            {{ $t('table.pagination', {
                                start: currentPage.start.toString(),
                                end: currentPage.end.toString(),
                                total: tableData.length.toString(),
                            }) }}
                        </template>
                        <template v-else-if="hasSelectColumn">
                            {{ $t('table.row_selected', {
                                // eslint-disable-next-line style/max-len
                                selected: (tableRef?.tableApi?.getFilteredSelectedRowModel().rows.length || 0).toString(),
                                total: (tableRef?.tableApi?.getFilteredRowModel().rows.length || 0).toString(),
                            }) }}
                        </template>
                    </div>
                    <UPagination
                        v-if="showPagination"
                        class="md:ml-auto"
                        :page="(tableRef?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                        :itemsPerPage="tableRef?.tableApi?.getState().pagination.pageSize"
                        :total="tableRef?.tableApi?.getFilteredRowModel().rows.length"
                        @update:page="(p) => tableRef?.tableApi?.setPageIndex(p - 1)"
                    />
                </div>
            </template>
        </template>
    </div>
</template>
