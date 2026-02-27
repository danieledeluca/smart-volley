<script setup lang="ts" generic="T">
import type { TableColumn, TableRow } from '@nuxt/ui';
import type { PaginationState } from '@tanstack/vue-table';

import { getPaginationRowModel } from '@tanstack/vue-table';

const {
    isLoading,
    tableData,
    tableColumns,
    onSelect,
} = defineProps<{
    isLoading: boolean;
    tableData: T[] | undefined;
    tableColumns?: TableColumn<T>[];
    onSelect?: (event: Event, row: TableRow<T>) => void;
}>();

const table = useTemplateRef('table');

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
    <div class="not-empty:mt-8">
        <template v-if="isLoading">
            <USkeleton class="h-116.75" />
        </template>
        <template v-else-if="tableData">
            <UTable
                ref="table"
                v-model:pagination="pagination"
                :data="tableData"
                :columns="tableColumns"
                class="striped-table rounded-md border border-accented has-[table+*]:rounded-b-none"
                sticky
                :empty="$t('table.empty')"
                :paginationOptions="{ getPaginationRowModel: getPaginationRowModel() }"
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
                    :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                    :itemsPerPage="table?.tableApi?.getState().pagination.pageSize"
                    :total="table?.tableApi?.getFilteredRowModel().rows.length"
                    @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
                />
            </div>
        </template>
    </div>
</template>
