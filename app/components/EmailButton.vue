<script setup lang="ts">
const { email } = defineProps<{
    email: string;
}>();
</script>

<template>
    <UButton
        variant="ghost"
        icon="i-lucide-mail"
        :href="`mailto:${email}`"
    />
</template>
