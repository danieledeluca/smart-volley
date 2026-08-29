<script setup lang="ts" generic="T">
import type { TableColumn, TableRow } from '@nuxt/ui';
import type { PaginationState, TableMeta } from '@tanstack/vue-table';
import type { FetchError } from 'ofetch';

import { getPaginationRowModel } from '@tanstack/vue-table';

const {
    tableData,
    tableColumns,
    tableMeta,
    isLoading,
    error,
    showPagination = false,
    showFilter = false,
} = defineProps<{
    tableData?: T[];
    tableColumns?: TableColumn<T>[];
    tableMeta?: TableMeta<T>;
    isLoading?: boolean;
    error?: FetchError;
    showPagination?: boolean;
    showFilter?: boolean;
}> ();

const emit = defineEmits<{
    select: [event: Event, row: TableRow<T>];
}>();

const slots = defineSlots<{
    default?: (props?: object) => VNode[];
}>();

const tableRef = useTemplateRef('tableRef');

const globalFilter = ref('');
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

function handleSelect(_event: Event, row: TableRow<T>) {
    hasSelectColumn.value ? row.toggleSelected(!row.getIsSelected()) : emit('select', _event, row);
}

defineExpose({
    selectRows: () => tableRef.value?.tableApi.getFilteredSelectedRowModel().rows,
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
    <UAlert
        v-else-if="error"
        :title="error.statusMessage"
        color="error"
        icon="i-lucide-circle-x"
    />
    <template v-else-if="tableData">
        <div v-if="showFilter || !!slots.default" class="flex items-center gap-4 max-md:flex-wrap sm:gap-6">
            <UInput
                v-if="showFilter"
                v-model="globalFilter"
                class="max-sm:flex-1"
                :placeholder="$t('table.global_filter.placeholder')"
                icon="i-lucide-search"
            />
            <slot />
        </div>
        <UTable
            ref="tableRef"
            v-model:globalFilter="globalFilter"
            v-model:pagination="pagination"
            :data="tableData"
            :columns="tableColumns"
            :meta="tableMeta"
            :loading="isLoading"
            :sticky="!showPagination"
            :virtualize="!showPagination"
            class="rounded-md border border-accented **:[thead]:bg-elevated **:[thead]:text-nowrap"
            :class="{
                'rounded-b-none': showPagination || hasSelectColumn,
                '**:[thead]:bg-elevated/75': !showPagination && hasSelectColumn,
            }"
            :paginationOptions="showPagination ? {
                getPaginationRowModel: getPaginationRowModel(),
            } : undefined"
            :globalFilterOptions="showFilter ? {
                getColumnCanGlobalFilter: (column) => {
                    if (column.id === 'id') {
                        return false
                    }

                    return true
                },
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
                    @update:page="(p) => tableRef?.tableApi?.setPageIndex(p - 1)"
                />
            </div>
        </template>
    </template>
</template>
