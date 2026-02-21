<script setup lang="ts" generic="T">
import type { DropdownMenuItem } from '@nuxt/ui';
import type { Column } from '@tanstack/vue-table';

const { column, label } = defineProps<{
    column: Column<T>;
    label: string;
}>();

const isSorted = computed(() => column.getIsSorted());

const dropdownMenuItems = computed<DropdownMenuItem[]>(() => {
    return [
        {
            label: 'Asc',
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
            label: 'Desc',
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
</script>

<template>
    <UDropdownMenu :content="{ align: 'start' }" :items="dropdownMenuItems">
        <UButton
            color="neutral"
            variant="ghost"
            :icon="isSorted
                ? isSorted === 'asc'
                    ? 'i-lucide-arrow-up-narrow-wide'
                    : 'i-lucide-arrow-down-wide-narrow'
                : 'i-lucide-arrow-up-down'"
            class="-mx-2.5 data-[state=open]:bg-elevated"
        >
            {{ label }}
        </UButton>
    </UDropdownMenu>
</template>
