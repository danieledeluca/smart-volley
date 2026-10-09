<script setup lang="ts">
const { title } = defineProps<{
    title: string;
}>();

const slots = defineSlots<{
    default?: (props?: object) => VNode[];
    right?: (props?: object) => VNode[];
    toolbar?: (props?: object) => VNode[];
}>();
</script>

<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar :title>
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>
                <template #right>
                    <slot name="right" />
                </template>
            </UDashboardNavbar>
            <UDashboardToolbar v-if="!!slots.toolbar">
                <slot name="toolbar" />
            </UDashboardToolbar>
        </template>
        <template #body>
            <slot />
        </template>
    </UDashboardPanel>
</template>
