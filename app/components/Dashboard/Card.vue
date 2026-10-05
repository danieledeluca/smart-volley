<script setup lang="ts">
const {
    icon,
    iconColor = 'neutral',
    title,
    description,
    badgeLabel,
    badgeColor = 'neutral',
} = defineProps<DashboardCard>();
</script>

<template>
    <UPageCard
        variant="subtle"
        :title
        :description
        :ui="{
            leading: 'mb-6',
            title: 'text-sm text-muted uppercase',
            description: 'text-3xl font-semibold text-highlighted',
        }"
    >
        <template #leading>
            <UButton
                variant="soft"
                :color="iconColor"
                :icon
                tabindex="-1"
            />
        </template>
        <UBadge
            v-if="badgeLabel"
            variant="soft"
            :color="badgeColor"
            size="lg"
            class="absolute top-4 right-4 sm:top-6 sm:right-6"
        >
            {{ badgeLabel }}
        </UBadge>
    </UPageCard>
</template>
