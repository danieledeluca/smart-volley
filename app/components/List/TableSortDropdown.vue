<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import type { Column, SortDirection } from '@tanstack/vue-table';

const { column, label, defaultSort } = defineProps<{
    column: Column<any>;
    label: string;
    defaultSort?: SortDirection;
}>();

const isSorted = computed(() => column.getIsSorted());

const dropdownMenuItems = computed<DropdownMenuItem[]>(() => {
    return [
        {
            label: $t('table.sort.asc'),
            type: 'checkbox',
            icon: 'i-lucide-arrow-up-narrow-wide',
            checked: isSorted.value === 'asc',
            onSelect: () => {
                if (isSorted.value === 'asc') {
                    column.clearSorting();
                } else {
                    column.toggleSorting(false);
                }
            },
        },
        {
            label: $t('table.sort.desc'),
            icon: 'i-lucide-arrow-down-wide-narrow',
            type: 'checkbox',
            checked: isSorted.value === 'desc',
            onSelect: () => {
                if (isSorted.value === 'desc') {
                    column.clearSorting();
                } else {
                    column.toggleSorting(true);
                }
            },
        },
    ];
});

if (defaultSort) {
    column.toggleSorting(defaultSort !== 'asc');
}
</script>

<template>
    <UDropdownMenu :items="dropdownMenuItems" :content="{ align: 'start' }">
        <UButton
            variant="ghost"
            color="neutral"
            :label
            :icon="isSorted
                ? isSorted === 'asc'
                    ? 'i-lucide-arrow-up-narrow-wide'
                    : 'i-lucide-arrow-down-wide-narrow'
                : 'i-lucide-arrow-up-down'"
            class="-mx-2.5 data-[state=open]:bg-elevated"
        />
    </UDropdownMenu>
</template>
