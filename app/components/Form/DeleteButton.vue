<script setup lang="ts">
const model = defineModel();
</script>

<template>
    <UButton
        icon="i-lucide-x"
        variant="subtle"
        color="error"
        @click.stop="model = undefined"
    />
</template>
