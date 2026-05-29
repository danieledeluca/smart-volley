<script setup lang="ts">
const { title, wrapBody = false } = defineProps<{
    title: string;
    wrapBody?: boolean;
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
            <div v-if="wrapBody" class="flex h-full flex-col">
                <slot />
            </div>
            <slot v-else />
        </template>
    </UDashboardPanel>
</template>
