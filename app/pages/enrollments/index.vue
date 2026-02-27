<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui';

import UUser from '@nuxt/ui/components/User.vue';

import TableSortDropdown from '~/components/List/TableSortDropdown.vue';

useSeoMeta({
    title: 'Iscrizioni',
});

const enrollmentsStore = useEnrollmentsStore();
const {
    enrollments,
    enrollmentsPending,
    enrollmentsState,
    enrollmentsFields,
} = storeToRefs(enrollmentsStore);

const tableColumns: TableColumn<EnrollmentListItem>[] = [
    {
        accessorKey: 'athlete',
        header: ({ column }) => h(TableSortDropdown, { column, label: $t('table.athletes.column.name') }),
        cell: ({ row }) => h(UUser, {
            name: row.original.athlete.name,
            description: `#${row.original.id?.toString()}`,
            avatar: { ...getAvatar(row.original.athlete.id?.toString(), 64) },
        }),
    },
    {
        accessorKey: 'season',
        header: $t('table.athletes.column.season'),
        cell: ({ row }) => `${row.original.season.starter_year} - ${row.original.season.end_year}`,
    },
    {
        accessorKey: 'season',
        header: $t('table.athletes.column.activity'),
        cell: ({ row }) => row.original.activity.name,
    },
    {
        accessorKey: 'course',
        header: 'Corso',
        cell: ({ row }) => row.original.course.name,
    },
];

function onSelect(_event: Event, row: TableRow<EnrollmentListItem>) {
    return navigateTo(`/enrollments/${row.original.id}`);
}
</script>

<template>
    <UPageHeader
        title="Titolo pagina iscrizioni"
        description="A responsive page header with title, description and actions."
    />
    <ListFilters
        v-model:state="enrollmentsState"
        :isLoading="enrollmentsPending"
        :schema="enrollmentsFiltersSchema"
        :fields="enrollmentsFields"
        @submit="() => enrollmentsStore.refreshEnrollments()"
    />
    <ListTable
        :isLoading="enrollmentsPending"
        :tableData="enrollments"
        :tableColumns
        :onSelect
    />
</template>
