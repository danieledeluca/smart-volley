<script setup lang="ts">
import type { FetchError } from 'ofetch';

const { error } = defineProps<{
    error: FetchError;
}>();
</script>

<template>
    <UAlert
        :title="error.statusMessage"
        color="error"
        icon="i-lucide-circle-x"
    />
</template>
