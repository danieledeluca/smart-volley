<script setup lang="ts">
const { title } = defineProps<{
    title: string;
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
        </template>
        <template #body>
            <slot />
        </template>
    </UDashboardPanel>
</template>
