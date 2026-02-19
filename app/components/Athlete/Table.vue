<script setup lang="ts" generic="T">
import type { TableColumn } from '@nuxt/ui';
import type { TableMeta } from '@tanstack/vue-table';

const { isLoading, isLoaded, tableData, tableColumns, tableMeta, tableStriped = true } = defineProps<{
    isLoading: boolean;
    isLoaded: boolean;
    tableData: T[];
    tableColumns?: TableColumn<T>[];
    tableMeta?: TableMeta<T>;
    tableStriped?: boolean;
}>();

const table = useTemplateRef('table');
</script>

<template>
    <div v-if="isLoading || tableData.length > 0" class="mt-8 border-t border-accented pt-8">
        <template v-if="isLoading">
            <USkeleton class="mx-auto mb-8 h-8 max-w-md" />
            <USkeleton class="h-56" />
        </template>
        <template v-else-if="tableData.length > 0">
            <UInput
                :modelValue="(table?.tableApi?.getColumn('name')?.getFilterValue() as string)"
                placeholder="Filter athletes..."
                class="mx-auto mb-8 block w-full max-w-md"
                icon="i-lucide-search"
                @update:model-value="table?.tableApi?.getColumn('name')?.setFilterValue($event)"
            />

            <UTable
                ref="table"
                :data="tableData"
                :columns="tableColumns"
                :meta="tableMeta"
                class="max-h-[50dvh] rounded-md border border-accented [&_thead]:text-nowrap"
                :class="tableStriped ? '[&_tbody_tr]:odd:bg-elevated' : ''"
                sticky
            />
        </template>
        <UEmpty
            v-else-if="isLoaded"
            title="No athletes found"
            description="It looks like there are no athletes for this activity and season."
            icon="i-lucide-user"
            class="mx-auto w-full max-w-md"
            variant="subtle"
        />
    </div>
</template>
