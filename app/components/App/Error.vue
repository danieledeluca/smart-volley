<script setup lang="ts">
import type { FetchError } from 'ofetch';

import type { NuxtError } from '#app';

const { error } = defineProps<{
    error: NuxtError | FetchError;
}>();
</script>

<template>
    <UAlert :title="getFetchErrorMessage(error)" color="error" icon="i-lucide-circle-x" />
</template>
