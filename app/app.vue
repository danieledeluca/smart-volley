<script setup lang="ts">
import { it } from '@nuxt/ui/locale';

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} | Smart Volley` : 'Smart Volley';
    },
});
</script>

<template>
    <UApp :locale="it">
        <AppHeader />
        <UMain class="py-8">
            <UContainer>
                <NuxtPage />
            </UContainer>
        </UMain>
        <AppFooter />
    </UApp>
</template>
