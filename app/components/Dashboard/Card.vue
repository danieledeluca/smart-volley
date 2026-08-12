<script setup lang="ts">
const {
    title,
    description,
    icon,
    iconColor = 'neutral',
    badgeLabel,
    badgeColor = 'neutral',
} = defineProps<DashboardCard>();
</script>

<template>
    <div class="rounded-lg bg-elevated/50 p-4 ring ring-default sm:p-6">
        <div class="relative">
            <UButton
                variant="soft"
                :color="iconColor"
                :icon
                tabindex="-1"
            />
            <div class="mt-6 text-sm text-muted uppercase">
                {{ title }}
            </div>
            <div class="mt-1 text-3xl font-semibold text-highlighted">
                {{ description }}
            </div>
            <UBadge
                v-if="badgeLabel"
                variant="soft"
                :color="badgeColor"
                size="lg"
                class="absolute top-0 right-0"
            >
                {{ badgeLabel }}
            </UBadge>
        </div>
    </div>
</template>
