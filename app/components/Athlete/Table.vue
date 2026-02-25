<script setup lang="ts" generic="T">
import type { TableColumn, TableRow } from '@nuxt/ui';
import type { TableMeta } from '@tanstack/vue-table';

const {
    showSearchField = true,
    isLoading,
    isLoaded,
    tableData,
    tableColumns,
    tableMeta,
    onSelect,
} = defineProps<{
    showSearchField?: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    tableData: T[];
    tableColumns?: TableColumn<T>[];
    tableMeta?: TableMeta<T>;
    onSelect?: (event: Event, row: TableRow<T>) => void;
}>();

const table = useTemplateRef('table');
</script>

<template>
    <div v-if="isLoading || isLoaded || tableData.length > 0" class="mt-8 border-t border-accented pt-8">
        <template v-if="isLoading">
            <USkeleton v-if="showSearchField" class="mx-auto mb-8 h-8 max-w-md" />
            <USkeleton class="h-56" />
        </template>
        <template v-else-if="tableData.length > 0">
            <UInput
                v-if="showSearchField"
                :modelValue="(table?.tableApi?.getColumn('name')?.getFilterValue() as string)"
                :placeholder="$t('table.athletes.form.search.placeholder')"
                class="mx-auto mb-8 block w-full max-w-md"
                icon="i-lucide-search"
                variant="subtle"
                @update:model-value="table?.tableApi?.getColumn('name')?.setFilterValue($event)"
            />
            <UTable
                ref="table"
                :data="tableData"
                :columns="tableColumns"
                :meta="tableMeta"
                class="striped-table"
                sticky
                :empty="$t('table.athletes.empty')"
                @select="onSelect"
            />
        </template>
        <UEmpty
            v-else-if="isLoaded"
            :title="$t('empty.athletes.title')"
            :description="$t('empty.athletes.description')"
            icon="i-lucide-user"
            class="mx-auto w-full max-w-md"
            variant="subtle"
        />
    </div>
</template>
