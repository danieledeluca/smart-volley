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
                <UButton color="primary" variant="soft" :icon="icon" />
                <span>{{ title }}</span>
            </h2>
        </template>
        <div class="*:py-2 *:not-last:border-b *:not-last:border-b-accented">
            <slot />
        </div>
    </UCard>
</template>
