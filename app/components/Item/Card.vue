<script setup lang="ts">
const { title, icon, removePadding = false } = defineProps<{
    title: string;
    icon: string;
    removePadding?: boolean;
}>();
</script>

<template>
    <UCard
        variant="subtle"
        class="@container"
        :ui="{ body: removePadding ? 'sm:p-0 p-0' : '' }"
    >
        <template #header>
            <h2 class="flex items-center gap-3 text-xl">
                <UButton color="primary" variant="soft" :icon="icon" />
                <span>{{ title }}</span>
            </h2>
        </template>
        <div class="grid gap-6 @2xl:grid-cols-2">
            <slot />
        </div>
    </UCard>
</template>
