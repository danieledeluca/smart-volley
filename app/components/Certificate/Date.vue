<script setup lang="ts">
const { date } = defineProps<{
    date: string | null;
}>();

const badgeProps = computed(() => getCertificateBadgeProps(date));
const textColor = computed(() => getCertificateTextColor(date));
</script>

<template>
    <div class="flex items-center gap-2">
        <UBadge variant="subtle" v-bind="badgeProps" />
        <span :class="textColor">
            {{ date ? formatDate(date) : EMPTY_VALUE }}
        </span>
    </div>
</template>
