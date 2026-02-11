<script setup lang="ts">
const { isLoading } = defineProps<{
    isLoading: boolean;
}>();
</script>

<template>
    <button type="submit" :aria-busy="isLoading ? 'true' : undefined" :disabled="isLoading">
        <template v-if="isLoading">
            Please wait...
        </template>
        <slot v-else />
    </button>
</template>
