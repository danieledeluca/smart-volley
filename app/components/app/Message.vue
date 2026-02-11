<script setup lang="ts">
const { type } = defineProps<{
    type: MessageType;
}>();
</script>

<template>
    <div class="message" :class="type">
        <slot />
    </div>
</template>

<style scoped>
.message {
    padding: var(--pico-block-spacing-vertical) var(--pico-block-spacing-horizontal);
    background-color: var(--background-color);
    color: var(--color);
    border-radius: var(--pico-border-radius);
    font-weight: 500;
}

.message.success {
    --background-color: var(--pico-color-green-500);
    --color: var(--pico-color-light);
}

.message.warning {
    --background-color: var(--pico-color-amber-200);
    --color: var(--pico-color-dark);
}

.message.error {
    --background-color: var(--pico-color-red-500);
    --color: var(--pico-color-light);
}
</style>
