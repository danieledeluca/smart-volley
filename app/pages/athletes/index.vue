<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui';

import UButton from '@nuxt/ui/components/Button.vue';
import UUser from '@nuxt/ui/components/User.vue';

import TableSortDropdown from '~/components/List/TableSortDropdown.vue';

useSeoMeta({
    title: $t('page.athletes.title'),
});

const enrollmentsStore = useEnrollmentsStore();
const { athletes, athletesPending, athletesState, athletesFields } = storeToRefs(enrollmentsStore);

const tableColumns: TableColumn<AthleteListItem>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => h(TableSortDropdown, { column, label: $t('table.athletes.column.name') }),
        cell: ({ row }) => h(UUser, {
            name: row.original.name,
            description: `#${row.original.id?.toString()}`,
            avatar: { ...getAvatar(row.original.id?.toString(), 64) },
        }),
    },
    {
        accessorKey: 'phoneNumber',
        header: $t('table.athletes.column.phone_number'),
        cell: ({ row }) => {
            return h('div', { class: 'flex gap-2 items-center' }, [
                h(UButton, {
                    color: 'primary',
                    variant: 'ghost',
                    href: `tel:${row.original.phone_number}`,
                    icon: 'i-lucide-phone',
                }),
                h(UButton, {
                    color: 'primary',
                    variant: 'ghost',
                    href: `https://api.whatsapp.com/send?phone=${row.original.phone_number}`,
                    target: '_blank',
                    icon: 'i-ic-baseline-whatsapp',
                }),
                h('span', undefined, row.original.phone_number),
            ]);
        },
    },
    {
        accessorKey: 'email',
        header: $t('table.athletes.column.email'),
        cell: ({ row }) => {
            if (row.original.email) {
                return h('div', { class: 'flex gap-2 items-center' }, [
                    h(UButton, {
                        color: 'primary',
                        variant: 'ghost',
                        href: `mailto:${row.original.email}`,
                        icon: 'i-lucide-mail',
                    }),
                    h('span', undefined, row.original.email),
                ]);
            }

            return EMPTY_VALUE;
        },
    },
];

function onSelect(_event: Event, row: TableRow<AthleteListItem>) {
    return navigateTo(`/athletes/${row.original.id}`);
}
</script>

<template>
    <UPageHeader
        title="Titolo pagina atleti"
        description="A responsive page header with title, description and actions."
    />
    <ListFilters
        v-model:state="athletesState"
        :isLoading="athletesPending"
        :schema="athletesFiltersSchema"
        :fields="athletesFields"
        @submit="() => enrollmentsStore.refreshAthletes()"
    />
    <ListTable
        :isLoading="athletesPending"
        :tableData="athletes"
        :tableColumns
        :onSelect
    />
</template>
