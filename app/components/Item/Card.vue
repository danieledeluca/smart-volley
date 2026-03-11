<script setup lang="ts">
const { title, icon } = defineProps<{
    title: string;
    icon: string;
}>();
</script>

<template>
    <UCard variant="subtle" class="@container">
        <template #header>
            <h2 class="flex items-center gap-3 text-xl">
                <UButton variant="soft" :icon="icon" />
                <span>{{ title }}</span>
            </h2>
        </template>
        <div class="grid gap-6 @2xl:grid-cols-2">
            <slot />
        </div>
    </UCard>
</template>
