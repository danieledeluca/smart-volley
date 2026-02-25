<script setup lang="ts">
import type { FormSubmitEvent, TableColumn, TableRow } from '@nuxt/ui';

import UUser from '@nuxt/ui/components/User.vue';

useSeoMeta({
    title: $t('page.payments.title'),
});

const isLoading = ref(false);
const isLoaded = ref(false);
const tableData = ref<EnrollmentPayment[]>([]);

const tableColumns: TableColumn<EnrollmentPayment>[] = [
    {
        accessorKey: 'athlete',
        header: $t('table.athletes.column.name'),
        cell: ({ row }) => h(UUser, { name: row.original.athlete.name, avatar: { ...getAvatar(row.original.athlete.id.toString(), 64) } }),
    },
    {
        accessorKey: 'volley_account',
        header: $t('table.athletes.column.volley_account'),
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
        header: $t('table.athletes.column.volley_balance'),
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
        header: $t('table.athletes.column.volley_balance_secondary'),
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
        header: $t('table.athletes.column.first_installment'),
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
        header: $t('table.athletes.column.second_installment'),
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
        header: $t('table.athletes.column.third_installment'),
        cell: ({ row }) => formatPrice(row.original.third_installment?.toString()),
        meta: {
            class: {
                th: 'text-center',
                td: 'text-center',
            },
        },
    },
];

async function onSubmit(event: FormSubmitEvent<AthleteFiltersSchema>) {
    try {
        isLoading.value = true;
        isLoaded.value = false;

        const athletesPayments = await $fetch<EnrollmentPayment[]>('/api/payments', {
            query: {
                season: event.data.season,
                activity: event.data.activity,
            },
        });

        tableData.value = athletesPayments;
    } finally {
        isLoading.value = false;
        isLoaded.value = true;
    }
}

function onSelect(_event: Event, row: TableRow<EnrollmentPayment>) {
    return navigateTo(`/enrollments/${row.original.id}`);
}
</script>

<template>
    <AthleteFilters
        :title="$t('page.payments.title')"
        :isLoading
        icon="i-lucide-credit-card"
        @submit="onSubmit"
    />
    <AthleteTable
        :isLoading
        :isLoaded
        :tableData
        :tableColumns
        :onSelect
    />
</template>
