<script setup lang="ts">
const { title, icon } = defineProps<{
    title: string;
    icon: string;
}>();
</script>

<template>
    <div>
        <div class="mb-4 flex items-center gap-3 border-b border-b-accented pb-2 text-xl">
            <UButton variant="soft" :icon="icon" />
            <div>{{ title }}</div>
        </div>
        <div class="space-y-4">
            <slot />
        </div>
    </div>
</template>
