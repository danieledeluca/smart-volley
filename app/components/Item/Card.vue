<script setup lang="ts">
const { title, icon } = defineProps<{
    title: string;
    icon: string;
}>();
</script>

<template>
    <UCard variant="subtle" class="@container has-[table]:**:data-[slot=body]:p-0 has-[table]:**:data-[slot=body]:*:grid-cols-1 has-[table]:**:data-[slot=root]:rounded-t-none">
        <template #header>
            <h2 class="flex items-center gap-4 text-xl">
                <UButton variant="soft" :icon="icon" />
                <span>{{ title }}</span>
            </h2>
        </template>
        <div class="grid gap-4 *:min-w-0 sm:gap-6 @2xl:grid-cols-2">
            <slot />
        </div>
    </UCard>
</template>
