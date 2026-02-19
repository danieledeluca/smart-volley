<script setup lang="ts">
const { title, icon } = defineProps<{
    title: string;
    icon: string;
}>();
</script>

<template>
    <UCard variant="subtle">
        <div class="space-y-4">
            <h2 class="text-2xl">
                <UButton
                    color="primary"
                    variant="soft"
                    :icon="icon"
                    class="mr-3"
                />
                <span>{{ title }}</span>
            </h2>
            <div class="space-y-2">
                <slot />
            </div>
        </div>
    </UCard>
</template>
