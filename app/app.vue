<script setup lang="ts">
import { it } from '@nuxt/ui/locale';

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} | Smart Volley` : 'Smart Volley';
    },
});

const authStore = useAuthStore();
await authStore.init();
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
