<script setup lang="ts">
import type { FormSubmitEvent, TableColumn, TableRow } from '@nuxt/ui';

import UUser from '@nuxt/ui/components/User.vue';

useSeoMeta({
    title: $t('page.athletes.title'),
});

const isLoading = ref(false);
const isLoaded = ref(false);
const tableData = ref<AthleteListItem[]>([]);

const tableColumns: TableColumn<AthleteListItem>[] = [
    {
        accessorKey: 'name',
        header: $t('table.athletes.column.name'),
        cell: ({ row }) => h(UUser, { name: row.original.name, avatar: { ...getAvatar(row.original.id?.toString(), 64) } }),
    },
];

async function onSubmit(event: FormSubmitEvent<AthleteFiltersSchema>) {
    try {
        isLoading.value = true;
        isLoaded.value = false;

        const athletes = await $fetch<AthleteListItem[]>('/api/athletes', {
            query: {
                name: event.data.mode === 'withName' ? event.data.name : '',
            },
        });

        tableData.value = athletes;
    } finally {
        isLoading.value = false;
        isLoaded.value = true;
    }
}

function onSelect(_event: Event, row: TableRow<AthleteListItem>) {
    return navigateTo(`/athletes/${row.original.id}`);
}
</script>

<template>
    <AthleteFilters
        :title="$t('page.athletes.title')"
        :isLoading
        icon="i-lucide-users"
        showNameField
        @submit="onSubmit"
    />
    <AthleteTable
        :showSearchField="false"
        :isLoading
        :isLoaded
        :tableData
        :tableColumns
        :onSelect
    />
</template>
