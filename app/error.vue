<script setup lang="ts">
import { it } from '@nuxt/ui/locale';

import type { NuxtError } from '#app';

const { error } = defineProps<{
    error: NuxtError;
}>();

useHead({
    title: getApiError(error),
    htmlAttrs: {
        lang: 'it',
    },
});
</script>

<template>
    <UApp :locale="it">
        <UError :error="error" />
    </UApp>
</template>
