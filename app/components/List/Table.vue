<script setup lang="ts" generic="T">
import type { TableColumn, TableRow } from '@nuxt/ui';
import type { SortDirection, TableMeta } from '@tanstack/vue-table';

import { getPaginationRowModel } from '@tanstack/vue-table';
import { useDebounceFn } from '@vueuse/core';

import type { NuxtError } from '#app';

const {
    tableData,
    tableColumns,
    tableMeta,
    isLoading,
    error,
    showFilter = false,
    showPagination = false,
    enableSorting = true,
    sortField,
    sortOrder,
} = defineProps<{
    tableData?: T[];
    tableColumns?: TableColumn<T>[];
    tableMeta?: TableMeta<T>;
    isLoading?: boolean;
    error?: NuxtError;
    showFilter?: boolean;
    showPagination?: boolean;
    enableSorting?: boolean;
    sortField?: keyof T;
    sortOrder?: SortDirection;
}>();
const emit = defineEmits<{
    select: [event: Event, row: TableRow<T>];
}>();
const slots = defineSlots<{
    default?: (props?: object) => VNode[];
}>();

const { setQueryValue } = useQuery();
const {
    globalFilter,
    globalFilterDebounced,
    pagination,
    currentPage,
    sorting,
} = useTableStates(() => tableData, tableColumns, sortField, sortOrder, enableSorting);
const tableRef = useTemplateRef('tableRef');

const hasSelectColumn = computed(() => Boolean(tableColumns?.find((column) => column.id === 'select')));

function handleSelect(_event: Event, row: TableRow<T>) {
    hasSelectColumn.value
        ? row.toggleSelected(!row.getIsSelected())
        : emit('select', _event, row);
}

const handleUpdate = useDebounceFn((value?: string) => {
    setQueryValue('filter', value);
}, 300);

defineExpose({
    selectedRows: () => tableRef.value?.tableApi.getFilteredSelectedRowModel().rows,
    toggleAllPageRowsSelected: (value?: boolean) => tableRef.value?.tableApi.toggleAllPageRowsSelected(value),
});
</script>

<template>
    <template v-if="isLoading && !tableData">
        <div v-if="showFilter || !!slots.default" class="flex items-center gap-4 max-md:flex-wrap sm:gap-6">
            <USkeleton v-if="showFilter" class="h-8 w-51.25" />
        </div>
        <USkeleton class="h-full" />
    </template>
    <AppError v-else-if="error" :error="error" />
    <template v-else-if="tableData">
        <div v-if="showFilter || !!slots.default" class="flex items-center gap-4 max-md:flex-wrap sm:gap-6">
            <UInput
                v-if="showFilter"
                v-model="globalFilter"
                class="max-sm:flex-1"
                :placeholder="$t('table.global_filter.placeholder')"
                icon="i-lucide-search"
                @update:modelValue="handleUpdate"
            />
            <slot />
        </div>
        <UTable
            ref="tableRef"
            v-model:globalFilter="globalFilterDebounced"
            v-model:pagination="pagination"
            v-model:sorting="sorting"
            :data="tableData"
            :columns="tableColumns"
            :meta="tableMeta"
            :loading="isLoading"
            :sticky="!showPagination"
            :virtualize="!showPagination"
            class="rounded-lg border border-accented **:[thead]:bg-elevated **:[thead]:text-nowrap"
            :class="{
                'rounded-b-none': showPagination || hasSelectColumn,
                '**:[thead]:bg-elevated/75': !showPagination && hasSelectColumn,
            }"
            :globalFilterOptions="showFilter ? {
                getColumnCanGlobalFilter: (column) => {
                    if (column.id === 'id') {
                        return false
                    }

                    return true
                },
            } : undefined"
            :paginationOptions="showPagination ? {
                getPaginationRowModel: getPaginationRowModel(),
            } : undefined"
            @select="handleSelect"
        />
        <template v-if="tableData.length > 0 && (showPagination || hasSelectColumn)">
            <div class="-mt-4 flex items-center gap-4 rounded-md rounded-t-none border border-t-0 border-accented bg-elevated px-4 py-3.5 max-md:flex-col sm:-mt-6">
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
                            selected: (tableRef?.tableApi?.getFilteredSelectedRowModel().rows.length || 0)
                                .toString(),
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
                    @update:page="tableRef?.tableApi?.setPageIndex($event - 1)"
                />
            </div>
        </template>
    </template>
</template>
