<script setup lang="ts">
const { title, icon } = defineProps<{
    title?: string;
    icon?: string;
}>();
</script>

<template>
    <fieldset>
        <div v-if="title && icon" class="mb-4 flex items-center gap-3 border-b border-b-accented pb-2 text-xl">
            <UButton variant="soft" :icon="icon" tabindex="-1" />
            <div>{{ title }}</div>
        </div>
        <div class="space-y-4">
            <slot />
        </div>
    </fieldset>
</template>
