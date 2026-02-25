<script setup lang="ts">
import type { FormSubmitEvent, TableColumn, TableRow } from '@nuxt/ui';

import UButton from '@nuxt/ui/components/Button.vue';
import UUser from '@nuxt/ui/components/User.vue';

useSeoMeta({
    title: $t('page.contacts.title'),
});

const isLoading = ref(false);
const isLoaded = ref(false);
const tableData = ref<AthleteContact[]>([]);

const tableColumns: TableColumn<AthleteContact>[] = [
    {
        accessorKey: 'name',
        header: $t('table.athletes.column.name'),
        cell: ({ row }) => h(UUser, { name: row.original.name, avatar: { ...getAvatar(row.original.id?.toString(), 64) } }),
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

async function onSubmit(event: FormSubmitEvent<AthleteFiltersSchema>) {
    try {
        isLoading.value = true;
        isLoaded.value = false;

        const athletesContacts = await $fetch<AthleteContact[]>('/api/contacts', {
            query: {
                name: event.data.mode === 'withName' ? event.data.name : '',
            },
        });

        tableData.value = athletesContacts;
    } finally {
        isLoading.value = false;
        isLoaded.value = true;
    }
}

function onSelect(_event: Event, row: TableRow<AthleteContact>) {
    return navigateTo(`/athletes/${row.original.id}`);
}
</script>

<template>
    <AthleteFilters
        :title="$t('page.contacts.title')"
        :isLoading
        icon="i-lucide-notebook"
        showNameField
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
