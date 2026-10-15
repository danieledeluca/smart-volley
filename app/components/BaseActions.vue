<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const { dropDownMenuItems: additionalItems } = defineProps<{
    dropDownMenuItems: DropdownMenuItem[];
}>();

const dropDownMenuItems = computed(() => {
    const items: DropdownMenuItem[] = [
        {
            type: 'label',
            label: $t('action.label'),
        },
    ];

    items.push(...additionalItems);

    return items;
});
</script>

<template>
    <template v-if="dropDownMenuItems.length > 1">
        <UDropdownMenu
            :items="dropDownMenuItems"
            :content="{
                align: 'end',
            }"
        >
            <UButton
                icon="i-lucide-ellipsis-vertical"
                color="neutral"
                variant="ghost"
            />
        </UDropdownMenu>
        <slot />
    </template>
</template>
