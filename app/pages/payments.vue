<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui';

import UUser from '@nuxt/ui/components/User.vue';

import TableSortDropdown from '~/components/List/TableSortDropdown.vue';

useSeoMeta({
    title: $t('page.payments.title'),
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
        header: ({ column }) => h(TableSortDropdown, { column, label: $t('table.column.name') }),
        cell: ({ row }) => h(UUser, {
            name: row.original.athlete.name,
            description: `#${row.original.id?.toString()}`,
            avatar: { ...getAvatar(row.original.athlete.id.toString(), 64) },
        }),
    },
    {
        accessorKey: 'volley_account',
        header: $t('table.column.volley_account'),
        cell: ({ row }) => formatPrice(row.original.volley_account?.toString()),
        meta: {
            class: {
                th: 'text-center',
                td: 'text-center',
            },
        },
    },
    {
        accessorKey: 'volley_balance',
        header: $t('table.column.volley_balance'),
        cell: ({ row }) => formatPrice(row.original.volley_balance?.toString()),
        meta: {
            class: {
                th: 'text-center',
                td: 'text-center',
            },
        },
    },
    {
        accessorKey: 'volley_balance_secondary',
        header: $t('table.column.volley_balance_secondary'),
        cell: ({ row }) => formatPrice(row.original.volley_balance_secondary?.toString()),
        meta: {
            class: {
                th: 'text-center',
                td: 'text-center',
            },
        },
    },
    {
        accessorKey: 'first_installment',
        header: $t('table.column.first_installment'),
        cell: ({ row }) => formatPrice(row.original.first_installment?.toString()),
        meta: {
            class: {
                th: 'text-center',
                td: 'text-center',
            },
        },
    },
    {
        accessorKey: 'second_installment',
        header: $t('table.column.second_installment'),
        cell: ({ row }) => formatPrice(row.original.second_installment?.toString()),
        meta: {
            class: {
                th: 'text-center',
                td: 'text-center',
            },
        },
    },
    {
        accessorKey: 'third_installment',
        header: $t('table.column.third_installment'),
        cell: ({ row }) => formatPrice(row.original.third_installment?.toString()),
        meta: {
            class: {
                th: 'text-center',
                td: 'text-center',
            },
        },
    },
];

function onSelect(_event: Event, row: TableRow<EnrollmentListItem>) {
    return navigateTo(`/enrollments/${row.original.id}`);
}
</script>

<template>
    <UPageHeader
        :title="$t('page.payments.header.title')"
        :description="$t('page.payments.header.description')"
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
